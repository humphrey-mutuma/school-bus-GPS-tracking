import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The email of the user', required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class UserProfileResDto {
  @ApiProperty({ description: 'The unique ID of the user' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ description: 'The account creation timestamp' })
  @IsString()
  createdAt: string;
}
