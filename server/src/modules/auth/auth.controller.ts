import { Controller, Post, Body, HttpStatus, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../common/dto/api-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as ApiResponseDecorator,
} from '@nestjs/swagger';
import {
  CreatePasswordDto,
  FindByEmailResDto,
  LoginDto,
  LoginResDto,
  RegisterDto,
} from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Authenticate and auto-login a user
   * @param authenticateDto
   * @returns
   */
  @Post('/login')
  // @Public() // Equivalent to @PermitAll
  @ApiOperation({ summary: 'login a user' })
  @ApiResponseDecorator({
    status: HttpStatus.OK,
    type: () => ApiResponse<LoginResDto>,
  })
  async loginUser(
    @Body() loginDto: LoginDto,
  ): Promise<ApiResponse<LoginResDto>> {
    const response = await this.authService.login(loginDto);
    return { message: 'Welcome Back', data: response };
  }

  /**
   * Authenticate and auto-login a user
   * @param authenticateDto
   * @returns
   */
  @Post('/register')
  // @Public() // Equivalent to @PermitAll
  @ApiOperation({ summary: 'register a user' })
  @ApiResponseDecorator({
    status: HttpStatus.OK,
    type: () => ApiResponse<RegisterDto>,
  })
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<string>> {
    const response = await this.authService.register(registerDto);
    return { message: 'Welcome', data: response };
  }

  @Get('/user')
  @ApiOperation({ summary: 'Find a user' })
  @ApiResponseDecorator({
    type: ApiResponse<boolean>,
  })
  async findByEmail(
    @Query('email') email: string,
  ): Promise<ApiResponse<FindByEmailResDto | null>> {
    return {
      message: ' ',
      data: await this.authService.findByEmail(email),
    };
  }

  /**
   * Change user password
   * @param createPasswordDto
   * @returns
   */

  @Post('create-password')
  @ApiOperation({ summary: 'create password' })
  @ApiResponseDecorator({
    status: HttpStatus.OK,
    type: () => ApiResponse<void>,
  })
  async createPassword(
    @Body() createPasswordDto: CreatePasswordDto,
  ): Promise<ApiResponse<string>> {
    const response = await this.authService.createPassword(createPasswordDto);
    return { message: response, data: null };
  }

  /**
   * Initiate password reset
   * @param username
   * @returns
   */

  @Post('forgot-password')
  // @Public() // Equivalent to @PermitAll
  @ApiOperation({ summary: 'Initiate password reset' })
  @ApiResponseDecorator({
    status: HttpStatus.OK,
    type: () => ApiResponse<void>,
  })
  async forgotPassword(@Body() username: string): Promise<ApiResponse<void>> {
    const response = await this.authService.forgotPassword(username);
    return { message: response, data: null };
  }
}
