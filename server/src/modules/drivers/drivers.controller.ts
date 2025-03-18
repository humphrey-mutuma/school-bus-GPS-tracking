import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto, DriverResDto } from './dto/driver.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { SessionUserDto } from '../auth/dto/sessionUser.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard) //  protected route
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  async create(
    @User() user: SessionUserDto,
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<ApiResponse<string>> {
    return {
      message: await this.driversService.createDriver(user.id, createDriverDto),
      data: null,
    };
  }

  @Get()
  async findAll(
    @User() user: SessionUserDto,
  ): Promise<ApiResponse<DriverResDto[]>> {
    return { data: await this.driversService.findAll(user.id), message: '' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<DriverResDto>> {
    return { data: await this.driversService.findOne(id), message: '' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<string>> {
    return { message: await this.driversService.remove(id), data: null };
  }
}
