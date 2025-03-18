import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { SessionUserDto } from 'src/modules/auth/dto/sessionUser.dto';
import { MessageResDto } from 'src/shared/dto/message.dto';
import { UserProfileResDto, UpdateUserDto } from './dto/user.dto';
import { ApiResponse } from 'src/common/dto/api-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  // @route   PATCH /profile/id
  // @desc    PATCH a user
  // @access  PRIVATE
  async updateUserProfile(
    user: SessionUserDto,
    UpdateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<MessageResDto>> {
    if (!user.id || !UpdateUserDto) {
      throw new UnauthorizedException();
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: UpdateUserDto,
        select: { id: true },
      });

      if (updatedUser) {
        return {
          message: '',
          data: { id: updatedUser.id, message: 'user Successfully updated' },
        };
      } else {
        throw new BadRequestException('User update failed!');
      }
    } catch (error) {
      const err = error as Error; // Assert that error is of type Error
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    }
  }

  // @desc    delete a user
  // @route   DELETE /api/users/: id
  async deleteUser(userId: string): Promise<ApiResponse<string>> {
    try {
      // check if user has properties first before deleting

      const deletedUser = await this.prisma.user.delete({
        where: { id: userId },
        select: { id: true },
      });
      if (deletedUser.id) {
        return {
          message: 'User deleted ',
          data: deletedUser.id,
        };
      } else {
        throw new BadRequestException('User not deleted!');
      }
    } catch (error) {
      const err = error as Error; // Assert that error is of type Error
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    }
  }

  // @route   GET /profile/:id
  // @desc    Get a user
  // @access  Private
  async findUserProfile(
    user: SessionUserDto,
  ): Promise<ApiResponse<UserProfileResDto>> {
    // logged in user is the user finna get profile for

    try {
      const userDate = await this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
          role: true,
          createdAt: true,
        },
      });
      if (userDate) {
        return {
          message: '',
          data: { ...userDate, createdAt: userDate.createdAt.toISOString() },
        };
      } else {
        throw new NotFoundException('User not found!');
      }
    } catch (error) {
      const err = error as Error; // Assert that error is of type Error
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
