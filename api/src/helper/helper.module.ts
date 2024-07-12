import { Module, Global } from '@nestjs/common';
import { HelperService } from './helper.service';

@Global()
@Module({
  providers: [HelperService],
  exports: [HelperModule],
})
export class HelperModule {}
