import { Injectable } from '@nestjs/common';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpgradeContainerDto } from './dto/upgrade-container.dto';
import axios from 'axios';
import { PrismaService } from '../prisma.service';
import { ManifestsService } from './../manifests/manifests.service';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class ContainersService {
  async get_manifest_data_by_name(manifestName: string) {
    return new Promise(async (resolve, reject) => {
      let manifestData = null;
      try {
        const PrismaSer = new PrismaService();
        const ManifestsSer = new ManifestsService(PrismaSer);
        const manifest = await ManifestsSer.findOneByName(manifestName);
        if (!manifest) {
          reject({ response: { data: { message: 'invalid manifest' } } });
          return false;
        }
        manifestData = JSON.parse(manifest['results']['structure']);

      } catch (err) {
        reject({ response: { data: { message: 'invalid manifest' } } });
        return false;
      }
      if (manifestData == null) {
        reject({ response: { data: { message: 'invalid manifest' } } });
        return false;
      }
      resolve(manifestData);
    });
  }

  replace_user_inputs_with_manifest_data(manifestData: any, userdata: any) {
    if (userdata.envs) {
      const mod_envs = userdata.envs;
      manifestData.envs.forEach((element: any) => {
        mod_envs.forEach((element2: any) => {
          if (element.name === element2.name && element2.value) {
            element.value = element2.value;
          }
        });
      });
    }
    if (userdata.ports) {
      const mod_ports = userdata.ports;
      manifestData.ports.forEach((element: any) => {
        mod_ports.forEach((element2: any) => {
          if (element.name === parseInt(element2.name) && element2.value) {
            element.value = parseInt(element2.value);
          }
        });
      });
    }
    if (userdata.volumes) {
      const mod_volumes = userdata.volumes;
      manifestData.binds.forEach((element: any) => {
        mod_volumes.forEach((element2: any) => {
          if (element.name === element2.name && element2.value) {
            element.value = element2.value;
          }
        });
      });
    }
    return manifestData;
  }

  prepare_docker_from_manifest(
    manifestName: string,
    manifestData: any,
    containerTag: any,
  ) {
    const Env = manifestData.envs.map((x: any) => {
      return `${x.name}=${x.value}`;
    });
    const Image = containerTag
      ? manifestData.image + ':' + containerTag
      : manifestData.image + ':' + manifestData.tag;
    const NetworkDisabled = false;
    const StopTimeout = manifestData.timeout;
    const NetworkMode = manifestData.network;
    const Labels = {
      crm_manifest: manifestName,
      crm_image: manifestData.image,
      crm_tag: containerTag ? containerTag : manifestData.tag,
    };
    manifestData.labels.forEach((element: any) => {
      Labels[`${element.name}`] = element.value;
    });
    const ExposedPorts = {};
    manifestData.ports.forEach((element: any) => {
      ExposedPorts[`${element.name}/${element.type}`] = {};
    });
    const Binds = manifestData.binds.map((x: any) => {
      return `${x.name}:${x.value}`;
    });
    const PortBindings = {};
    manifestData.ports.forEach((element: any) => {
      PortBindings[`${element.name}/${element.type}`] = [
        { HostPort: element.value.toString() },
      ];
    });
    const RestartPolicy = {
      Name: manifestData.restart,
      MaximumRetryCount: manifestData.retry,
    };
    const HostConfig = { NetworkMode };
    if (Binds.length > 0) {
      HostConfig['Binds'] = Binds;
    }
    if (Object.keys(PortBindings).length > 0) {
      HostConfig['PortBindings'] = PortBindings;
    }
    if (manifestData.restart !== '') {
      HostConfig['RestartPolicy'] = RestartPolicy;
    }
    const final = { Image, NetworkDisabled, StopTimeout, HostConfig }
    if (Env.length > 0) {
      final['Env'] = Env;
    }
    if (Object.keys(Labels).length > 0) {
      final['Labels'] = Labels;
    }
    if (Object.keys(ExposedPorts).length > 0) {
      final['ExposedPorts'] = ExposedPorts;
    }
    return final;
  }

  async create(createContainerDto: CreateContainerDto) {
    return new Promise(async (resolve, reject) => {
      const containerName = createContainerDto.name;
      const manifestName = createContainerDto.manifest;
      const containerTag = createContainerDto.tag
        ? createContainerDto.tag
        : false;
      let manifestData = null;

      try {
        manifestData = await this.get_manifest_data_by_name(manifestName);
      } catch (e) {
        reject(e);
      }

      try {
        manifestData = this.replace_user_inputs_with_manifest_data(
          manifestData,
          createContainerDto,
        );
      } catch (e) {
        reject({ response: { data: { message: 'invalid user inputs' } } });
      }

      let final = {};

      try {
        final = this.prepare_docker_from_manifest(
          manifestName,
          manifestData,
          containerTag,
        );
      } catch (e) {
        reject({ response: { data: { message: 'could not create docker dto' } } });
      }

      // check for static ip configuration
      try {
        if (createContainerDto.ip) {
          final['NetworkingConfig'] = {};
          final['NetworkingConfig']['EndpointsConfig'] = {};
          final['NetworkingConfig']['EndpointsConfig'][manifestData.network] = { IPAMConfig: { IPv4Address: createContainerDto.ip } };
        }
      } catch (e) {
        reject({ response: { data: { message: 'could not use user ip' } } });
      }

      try {
        const { data } = await axios.post(`http://unix:/containers/create?name=${containerName}`, final, { socketPath: '/var/run/docker.sock' });
        if (createContainerDto.start && createContainerDto.start === true) {
          await this.start(data.Id);
          const info = await this.one(data.Id);
          const NetworkMode = info['HostConfig'].NetworkMode;
          const networks = info['NetworkSettings'].Networks;
          resolve({ status: 201, message: '', results: {Id: data.Id, Ip: networks[NetworkMode].IPAddress} });
        } else {
          resolve({ status: 201, message: '', results: {Id: data.Id }});
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async all() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/containers/json?all=true`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async one(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/containers/${id}/json`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async start(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/start`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async stop(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/stop`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async restart(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/restart`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async pause(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/pause`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async resume(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/unpause`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async kill(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/containers/${id}/kill`, undefined, { socketPath: '/var/run/docker.sock' });
        resolve({ status: 201, message: '', results: data });
      } catch (err) {
        reject(err);
      }
    });
  }

  async upgrade(id: string, UpgradeContainerDto: UpgradeContainerDto) {
    return new Promise(async (resolve, reject) => {

      const container: any = await this.one(id);
      const container_name = container.Name.substring(1);
      const contaienr_Binds = container.HostConfig.Binds;
      const contaienr_Mounts = container.Mounts;
      const container_NetworkMode = container.HostConfig.NetworkMode;
      const container_PortBindings = container.HostConfig.PortBindings;
      const container_RestartPolicy = container.HostConfig.RestartPolicy;
      const container_ExposedPorts = container.Config.ExposedPorts;
      const container_Env = container.Config.Env;
      const container_Labels = container.Config.Labels;
      const container_StopTimeout = container.Config.StopTimeout;
      const container_IPAddress = container.NetworkSettings.Networks[container_NetworkMode].IPAddress;

      const container_manifest = container_Labels['crm_manifest'];
      const container_image = container_Labels['crm_image'];
      const container_tag = container_Labels['crm_tag'];

      // console.log(container_name);
      // console.log(contaienr_Binds);
      // console.log(contaienr_Mounts);
      // console.log(container_NetworkMode);
      // console.log(container_PortBindings);
      // console.log(container_RestartPolicy);
      // console.log(container_ExposedPorts);
      // console.log(container_Env);
      // console.log(container_Labels);
      // console.log(container_StopTimeout);
      // console.log(container_IPAddress);
      // console.log(container_manifest);
      // console.log(container_image);
      // console.log(container_tag);

      let manifestData = null;
      try {
        manifestData = await this.get_manifest_data_by_name(container_manifest);
      } catch (e) {
        reject(e);
      }

      if (container_Env && container_Env.length > 0) {
        manifestData.envs.forEach((element: any) => {
          container_Env.forEach((element2: any) => {
            const t = element2.split('=');
            if (element.name === t[0]) { element.value = t[1]; }
          });
        });
      }

      if (contaienr_Binds && contaienr_Binds.length > 0) {
        manifestData.binds.forEach((element: any) => {
          contaienr_Binds.forEach((element2: any) => {
            const t = element2.split(':');
            if (element.name === t[0]) { element.value = t[1]; }
          });
        });
      }

      if (container_PortBindings && Object.keys(container_PortBindings).length > 0) {
        manifestData.ports.forEach((element: any) => {
          for (const [key, value] of Object.entries(container_PortBindings)) {
            const t = key.split('/');
            if (element.name === parseInt(t[0]) && element.type === t[1]) { element.value = parseInt(value[0].HostPort) }
          }
        });
      }

      manifestData = this.replace_user_inputs_with_manifest_data(
        manifestData,
        UpgradeContainerDto,
      );

      const final = this.prepare_docker_from_manifest(
        container_manifest,
        manifestData,
        UpgradeContainerDto.tag,
      );

      final['NetworkingConfig'] = {};
      final['NetworkingConfig']['EndpointsConfig'] = {};
      final['NetworkingConfig']['EndpointsConfig'][manifestData.network] = { IPAMConfig: { IPv4Address: container_IPAddress } };

      await this.remove(id, true);
      try {
        const { data } = await axios.post(`http://unix:/containers/create?name=${container_name}`, final, { socketPath: '/var/run/docker.sock' });
        await this.start(data.Id);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async logs(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const Convert = require('ansi-to-html');
        const converter = new Convert({ newline: true });
        const { data } = await axios.get(`http://unix:/containers/${id}/logs?follow=false&tail=1000&stdout=true&stderr=true`, { socketPath: '/var/run/docker.sock' });
        resolve(converter.toHtml(data).replace(/[^0-9a-z<> ]/gi, ''));
      } catch (err) {
        reject(err);
      }
    });
  }

  async stats(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/containers/${id}/stats?stream=false`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async remove(id: string, force: boolean) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.delete(`http://unix:/containers/${id}?force=${force}`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
