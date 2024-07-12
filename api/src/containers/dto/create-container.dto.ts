import { ApiProperty } from "@nestjs/swagger";

type pp = {
  name: string;
  value: string;
};

export class CreateContainerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tag?: string;

  @ApiProperty()
  manifest: string;

  @ApiProperty()
  start?: boolean;

  @ApiProperty()
  envs?: pp[];

  @ApiProperty()
  ports?: pp[];

  @ApiProperty()
  volumes?: pp[];

  @ApiProperty()
  ip?: string;
}
