import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    try {
      return await this.imagesService.create(createImageDto);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.imagesService.findAll();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.imagesService.findOne(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.imagesService.remove(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }
}
