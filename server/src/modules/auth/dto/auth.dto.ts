// import { Prisma } from '@prisma/client';
export class CreateAuthDto {}
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '@prisma/client';

export class LoginDto {
  @ApiProperty({ description: 'User email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User phone number', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  // @ApiProperty({ description: 'User role', enum: Role })
  // @IsEnum(Role)
  // role: string;

  @ApiProperty({ description: 'School name' })
  @IsString()
  schoolName: string;

  @ApiProperty({ description: 'School Address' })
  @IsString()
  schoolAddress?: string;
}
export class FindByEmailResDto {
  @ApiProperty({ description: 'User email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'User has password' })
  hasPassword: boolean;
}

export class LoginResDto {
  @ApiProperty({ description: 'The access token for authentication' })
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'The refresh token for authentication' })
  @IsString()
  refreshToken: string;

  @ApiProperty({ description: 'The user ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'The image URL or path for the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'user role' })
  email: string;

  @ApiProperty({ description: 'user role' })
  role: Role;

  @ApiProperty({ description: 'user school info' })
  school?: {
    id: string;
    name: string;
    address?: string;
  };
}

export class RefreshAccessTokenResDto {
  @ApiProperty({ description: 'The new access token' })
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'The new refresh token' })
  @IsString()
  refreshToken: string;
}

export class CreatePasswordDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'The current password' })
  @IsString()
  password: string;
}
