import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({ description: 'The name of the driver' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Driver email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'The phone number of the driver' })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'The car number plate assigned to the driver' })
  @IsString()
  carNumberPlate?: string;
}

export class DriverResDto {
  @ApiProperty({ description: 'The unique ID of the driver' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'The name of the driver' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The name of the driver' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'The phone number of the driver' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'The car number plate assigned to the driver' })
  @IsString()
  carNumberPlate: string;
}
