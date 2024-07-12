import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import axios from 'axios';
import { HelperService } from '../helper/helper.service';


@Injectable()
export class ImagesService {
  constructor(private helper: HelperService) {}

  async create(createImageDto: CreateImageDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const xxx = Buffer.from(JSON.stringify({ username: createImageDto.username, password: createImageDto.password, email: createImageDto.email, serveraddress: createImageDto.registry })).toString('base64');
        const { data } = await axios.post(`http://unix:/images/create?fromImage=${createImageDto.image}&tag=${createImageDto.tag}`, undefined, { socketPath: '/var/run/docker.sock', headers: { 'X-Registry-Auth': xxx } });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('http://unix:/images/json', { socketPath: '/var/run/docker.sock' });
        // extract version
        const arr = [];
        if (data) {
          data.forEach(element => {
            const tags = element.RepoTags;
            if (tags && tags.length > 0) {
              element.RepoTags = tags.map(tag => {
                const res = this.helper.extractTag(tag);
                if (arr.filter((x) => x.Name === res.name).length === 0) {
                  arr.push({
                    Name: res.name,
                    Versions: [
                      {
                        Id: element.Id,
                        Version: res.version,
                        RepoTags: res,
                        Created: element.Created,
                      },
                    ],
                  });
                } else {
                  arr.filter((x) => x.Name === res.name)[0].Versions.push(
                    {
                      Id: element.Id,
                      Version: res.version,
                      RepoTags: res,
                      Created: element.Created,
                    }
                  );
                }
                return res;
              });
            }
          });
        }
        resolve(arr);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findOne(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/images/${id}/json`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.delete(`http://unix:/images/${id}`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
