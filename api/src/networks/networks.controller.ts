import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { NetworksService } from './networks.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('networks')
@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Post()
  async create(@Body() createNetworkDto: CreateNetworkDto) {
    try {
      return await this.networksService.create(createNetworkDto);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.networksService.findAll();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.networksService.findOne(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.networksService.remove(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }
}
