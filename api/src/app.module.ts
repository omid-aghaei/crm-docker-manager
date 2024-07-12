import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManifestsModule } from './manifests/manifests.module';
import { ImagesModule } from './images/images.module';
import { NetworksModule } from './networks/networks.module';
import { HelperModule } from './helper/helper.module';
import { ContainersModule } from './containers/containers.module';

@Module({
  imports: [ManifestsModule, ImagesModule, NetworksModule, HelperModule, ContainersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
