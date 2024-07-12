import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getPing() {
    try {
      return await this.appService.getPing();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get('/info')
  async getInfo() {
    try {
      return await this.appService.getInfo();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get('/version')
  async getVersion() {
    try {
      return await this.appService.getVersion();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get('/useage')
  async getUsage() {
    try {
      return await this.appService.getUsage();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }
}
