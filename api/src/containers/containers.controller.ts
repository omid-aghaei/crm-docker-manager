import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query } from '@nestjs/common';
import { ContainersService } from './containers.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpgradeContainerDto } from './dto/upgrade-container.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class generalError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

class createOk {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  Ip: string;
}

@ApiTags('containers')
@Controller('containers')
export class ContainersController {
  constructor(private readonly containersService: ContainersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'ok', type: createOk})
  @ApiResponse({ status: 400, description: 'error', type: generalError})
  async create(@Body() createContainerDto: CreateContainerDto) {
    try {
      return await this.containersService.create(createContainerDto);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get()
  async all() {
    try {
      return await this.containersService.all();
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    try {
      return await this.containersService.one(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/start')
  async start(@Param('id') id: string) {
    try {
      return await this.containersService.start(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/stop')
  async stop(@Param('id') id: string) {
    try {
      return await this.containersService.stop(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/restart')
  async restart(@Param('id') id: string) {
    try {
      return await this.containersService.restart(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/pause')
  async pause(@Param('id') id: string) {
    try {
      return await this.containersService.pause(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/resume')
  async resume(@Param('id') id: string) {
    try {
      return await this.containersService.resume(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/kill')
  async kill(@Param('id') id: string) {
    try {
      return await this.containersService.kill(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Post(':id/upgrade')
  async upgrade(@Param('id') id: string, @Body() UpgradeContainerDto: UpgradeContainerDto) {
    try {
      return await this.containersService.upgrade(id, UpgradeContainerDto);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':id/logs')
  async logs(@Param('id') id: string) {
    try {
      return await this.containersService.logs(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Get(':id/stats')
  async stats(@Param('id') id: string) {
    try {
      return await this.containersService.stats(id);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'null'})
  @ApiResponse({ status: 400, description: 'error', type: generalError})
  async remove(@Param('id') id: string, @Query('force') force?: string) {
    try {
      return await this.containersService.remove(id, force && force === 'true' ? true : false);
    } catch (err) {
      throw new HttpException(err.response.data.message, 400);
    }
  }
}
