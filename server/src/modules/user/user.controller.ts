import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { SessionUserDto } from 'src/modules/auth/dto/sessionUser.dto';
import { UserProfileResDto } from './dto/user.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) //  protected route
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *  fetch user profile
   * @param user
   * @returns
   */
  @Get('/profile')
  @ApiOkResponse({
    description: 'Success',
    type: ApiResponse<UserProfileResDto>,
  })
  async findUserProfile(
    @User() user: SessionUserDto,
  ): Promise<ApiResponse<UserProfileResDto>> {
    if (!user.id) {
      throw new UnauthorizedException();
    }
    return await this.userService.findUserProfile(user);
  }

  /**
   *  delete user properties *******************
   * @param id
   * @param user
   * @returns
   */
  @Delete('/:userId')
  @ApiOkResponse({
    description: 'Success',
    type: ApiResponse<string>,
  })
  async deleteUser(
    @Param('userId') userId: string,
    @User() user: SessionUserDto,
  ): Promise<ApiResponse<string>> {
    if (userId !== user.id) {
      throw new UnauthorizedException();
    }
    return await this.userService.deleteUser(user.id);
  }
}
