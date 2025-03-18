import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ApiResponse<T> {
  @ApiProperty({ description: 'Response message' })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({ description: 'Response data' })
  @IsOptional()
  data: T;
}
