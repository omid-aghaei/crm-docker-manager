import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';
import axios from 'axios';

@Injectable()
export class AppService {

  async getPing(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('http://unix:/_ping', { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getInfo(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('http://unix:/info', { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getVersion(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('http://unix:/version', { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUsage(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get('http://unix:/system/df', { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
