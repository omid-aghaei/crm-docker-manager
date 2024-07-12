import { PartialType } from '@nestjs/mapped-types';
import { CreateManifestsDto } from './create-manifests.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManifestsDto extends PartialType(CreateManifestsDto) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  structure: string;
}
