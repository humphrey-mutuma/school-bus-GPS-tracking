export class CreateAuthDto {}

import { ApiProperty } from '@nestjs/swagger';

export class MessageResDto {
  @ApiProperty({})
  id: string | number;
  @ApiProperty({})
  message: string;
}
