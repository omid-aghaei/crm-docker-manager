import { ApiProperty } from '@nestjs/swagger';

export class CreateManifestsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  structure: string;
}
