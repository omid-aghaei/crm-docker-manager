import { Module } from '@nestjs/common';
import { ManifestsService } from './manifests.service';
import { ManifestsController } from './manifests.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ManifestsController],
  providers: [ManifestsService, PrismaService],
})
export class ManifestsModule {}
