import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto, SchoolResDto } from './dto/school.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SessionUserDto } from '../auth/dto/sessionUser.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard) //  protected route
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async create(
    @User() user: SessionUserDto,
    @Body() createSchoolDto: CreateSchoolDto,
  ): Promise<ApiResponse<string>> {
    return {
      message: await this.schoolsService.create(user.id, createSchoolDto),
      data: null,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<SchoolResDto[]>> {
    return { data: await this.schoolsService.findAll(), message: '' };
  }

  @Get(':id')
  async findOne(
    @User() user: SessionUserDto,
    @Param('id') id: string,
  ): Promise<ApiResponse<SchoolResDto>> {
    return { data: await this.schoolsService.findOne(id), message: '' };
  }

  @Delete(':id')
  async remove(
    @User() user: SessionUserDto,
    @Param('id') id: string,
  ): Promise<ApiResponse<string>> {
    return { message: await this.schoolsService.remove(id), data: null };
  }
}
