import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  parentName: string;

  @ApiProperty({})
  @IsString()
  parentEmail: string;
}

export class FindStudentDto {
  @ApiProperty({})
  @IsString()
  id: string;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  parentEmail: string;

  @ApiProperty({})
  @IsString()
  parentName: string;
}
