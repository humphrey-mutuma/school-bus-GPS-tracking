import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateParentDto, ParentResDto } from './dto/parent.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard) //  protected route
@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  async create(
    @Body() createParentDto: CreateParentDto,
  ): Promise<ApiResponse<string>> {
    return {
      message: await this.parentsService.createParent(createParentDto),
      data: null,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<ParentResDto[]>> {
    return { data: await this.parentsService.findAll(), message: '' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<ParentResDto>> {
    return { data: await this.parentsService.findOne(id), message: '' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<string>> {
    return { message: await this.parentsService.remove(id), data: null };
  }
}
