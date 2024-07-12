import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
  @ApiProperty()
  registry: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  tag: string;
}
