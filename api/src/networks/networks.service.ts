import { Injectable } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import axios from 'axios';

@Injectable()
export class NetworksService {
  async create(createNetworkDto: CreateNetworkDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://unix:/networks/create`, createNetworkDto, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/networks`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findOne(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`http://unix:/networks/${id}`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async remove(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.delete(`http://unix:/networks/${id}`, { socketPath: '/var/run/docker.sock' });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
