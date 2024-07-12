import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HelperService } from 'src/helper/helper.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, HelperService],
})
export class ImagesModule {}
