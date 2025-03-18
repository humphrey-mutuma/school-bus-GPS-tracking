import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParentDto {
  @ApiProperty({
    description: 'The email address of the parent',
  })
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  name: string;
  @ApiProperty({})
  @IsString()
  phoneNumber: string;

  @ApiProperty({})
  students: string[];
}

export class ParentResDto {
  @ApiProperty({})
  @IsString()
  id: string;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  email?: string;
  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
