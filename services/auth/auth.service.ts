import {
  ResetUserPasswordDto,
  RefreshAccessTokenResDto,
  AuthenticateDto,
  AuthenticateResDto,
} from "./dto/auth.dto";
import { axiosInstance, axiosInstanceInsecure } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";
 
class AuthService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `/api/auth${endpoint}`;
  }

  // authenticate user ***************************************************

  async authenticateUser(
    authenticateDto: AuthenticateDto
  ): Promise<ApiResponse<AuthenticateResDto>> {
    const { username, password } = authenticateDto;
    // // Hash password user password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPass = await bcrypt.hash(passHash, salt);

    try {
      const res = await axiosInstanceInsecure.post(this.baseUrl(`/auth`), {
        username,
        password,
      });

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /auth!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  // refresh user ***************************************

  async refreshAccessToken(
    refToken: string
  ): Promise<ApiResponse<RefreshAccessTokenResDto>> {
    // hash the pass here
    console.log("refToken", refToken);

    try {
      const res = await axiosInstance.post(
        this.baseUrl(`/refresh`),
        {
          refToken,
        },
        {
          withCredentials: true, // Ensure credentials are sent with every request
        }
      );
      return res.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // log in a user
  // async loginUser({ username, password }: LoginDto): Promise<ApiResponse<LoginResDto>> {
  //   // hash password here
  //   try {
  //     const res = await axiosInstance.post(
  //       this.baseUrl("/login"),
  //       { username, password }
  //       // {
  //       //   headers: {
  //       //     "Content-Type": "application/x-www-form-urlencoded",
  //       //   },
  //       // }
  //     );

  //     if (res.status === 201) {
  //       return res.data;
  //     } else {
  //       throw new Error(`Something went wrong on /login!: `);
  //     }
  //   } catch (error) {
  //     handleAxiosError(error);
  //   }
  // }

  // log a user out
  // @UseGuards(JwtAuthGuard) //  protected route
  async logOutUser(userId: string): Promise<ApiResponse<unknown>> {
    //  protected route
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.post(this.baseUrl("/logout"), {});

      if (res.status === 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /login!: `);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }
  // reset a user email

  async resetUserPassword(
    resetUserPasswordDto: ResetUserPasswordDto
  ): Promise<ApiResponse<unknown>> {
    try {
      const res = await axiosInstance.patch(
        this.baseUrl("/reset-password"),
        {
          ...resetUserPasswordDto,
        }
        // {
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /reset-password!: `);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // verify email for new accounts
  // @UseGuards(JwtAuthGuard) //  protected route
  async createValidationMagicLink(
    userId: string
  ): Promise<ApiResponse<unknown>> {
    //  protected route
    if (!userId) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.post(this.baseUrl("/verify-email"), {});

      if (res.status === 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /verify-email!: `);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // verify email for new accounts

  async validateEmailWithMagicLink(
    token: string
  ): Promise<ApiResponse<unknown>> {
    try {
      const res = await axiosInstance.get(
        this.baseUrl(`/validate-email?token=${token}`)
      );

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /validate-email!: `);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

const authService = new AuthService();
export default authService;
