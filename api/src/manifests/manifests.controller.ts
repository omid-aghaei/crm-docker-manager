import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpException } from '@nestjs/common';
import { ManifestsService } from './manifests.service';
import { CreateManifestsDto } from './dto/create-manifests.dto';
import { UpdateManifestsDto } from './dto/update-manifests.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class generalError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

@ApiTags('manifests')
@Controller('manifests')
export class ManifestsController {
  constructor(private readonly manifestsService: ManifestsService) {}

  @Post()
  async create(@Body() createManifestsDto: CreateManifestsDto) {
    try {
      return await this.manifestsService.create(createManifestsDto);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get()
  findAll() {
    return this.manifestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.manifestsService.findOne(id);
  }

  @Get(':name/info')
  async findOneByName(@Param('name') name: string) {
    try {
      return await this.manifestsService.findOneByName(name);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':name/tags')
  @ApiResponse({ status: 201, description: 'array of strings'})
  @ApiResponse({ status: 400, description: 'error', type: generalError})
  async findTags(@Param('name') name: string) {
    try {
      return await this.manifestsService.findTags(name);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateManifestsDto: UpdateManifestsDto) {
    return this.manifestsService.update(id, updateManifestsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.manifestsService.remove(id);
  }
}
