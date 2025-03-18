import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ description: 'The name of the school' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the school' })
  @IsString()
  address?: string;
}

export class SchoolResDto {
  @ApiProperty({ description: 'The unique ID of the school' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'The name of the school' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The address of the school' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'The admin of the school' })
  @IsString()
  admin: string;
}
