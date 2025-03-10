import {
  UserProfileResDto,
  UpdateUserDto,
  ListedRentalsResDto,
} from "./dto/user.dto";
import { handleAxiosError } from "@/utils/errorhandler";
import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";

// 1837259375

export class UserService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `users${endpoint}`;
  }

  // fetch user profile ***********************

  async findUserProfile(
    userId: string
  ): Promise<ApiResponse<UserProfileResDto>> {
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.get(this.baseUrl(`/profile/${userId}`));
      if (res.status === 200) {
        return res.data?.data;
      } else {
        throw new Error(`Something went wrong on /profile/id!`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // update user profile **************************

  async updateUserProfile(
    userId: string,
    updateUserProfileDto: UpdateUserDto
  ): Promise<ApiResponse<{ message: string; data: any }>> {
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.patch(this.baseUrl(`/${userId}`), {
        ...updateUserProfileDto,
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /users/:id!`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // fetch user listed properties ******************
  async findUserListings(userId: string): Promise<ListedRentalsResDto[]> {
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.get(this.baseUrl(`/listing`));
      if (res.status === 200) {
        return res.data?.data;
      } else {
        throw new Error(`Something went wrong on /users/:id!`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // delete user *******************
  async deleteUser(
    userId: string
  ): Promise<ApiResponse<{ message: string; data: any }>> {
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.delete(this.baseUrl(`/${userId}`));
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /:id!`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

const userService = new UserService();
export default userService;
