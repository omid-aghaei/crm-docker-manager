import { ApiProperty } from "@nestjs/swagger";

type pp = {
  name: string;
  value: string;
};

export class UpgradeContainerDto {
  @ApiProperty()
  tag?: string;

  @ApiProperty()
  envs?: pp[];

  @ApiProperty()
  ports?: pp[];

  @ApiProperty()
  volumes?: pp[];
}
