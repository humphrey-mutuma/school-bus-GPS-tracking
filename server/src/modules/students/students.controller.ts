import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, FindStudentDto } from './dto/student.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SessionUserDto } from '../auth/dto/sessionUser.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard) //  protected route
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('')
  @ApiOkResponse({
    description: 'Success',
    type: ApiResponse<CreateStudentDto>,
  })
  async create(
    @User() user: SessionUserDto,
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ApiResponse<string>> {
    return {
      message: await this.studentsService.create(user.id, createStudentDto),
      data: null,
    };
  }

  @Get()
  async findAll(
    @User() user: SessionUserDto,
  ): Promise<ApiResponse<FindStudentDto[]>> {
    return { data: await this.studentsService.findAll(user.id), message: '' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<FindStudentDto>> {
    return { data: await this.studentsService.findOne(id), message: '' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<string>> {
    return { message: await this.studentsService.remove(id), data: null };
  }
}
