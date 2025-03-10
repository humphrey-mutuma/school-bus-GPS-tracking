import {
  CreatePasswordDto,
  FindByEmailResDto,
  LoginDto,
  LoginResDto,
  RegisterDto,
} from "./dto/auth.dto";
import { axiosInstance, axiosInstanceInsecure } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";
import { Toast } from "toastify-react-native";

class AuthService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `auth${endpoint}`;
  }

  // authenticate user ***************************************************

  async login(authenticateDto: LoginDto): Promise<ApiResponse<LoginResDto>> {
    const { email, password } = authenticateDto;
    // // Hash password user password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPass = await bcrypt.hash(passHash, salt);

    try {
      const res = await axiosInstanceInsecure.post(this.baseUrl(`/login`), {
        email,
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
  async register(registerDto: RegisterDto): Promise<ApiResponse<string>> {
    try {
      const res = await axiosInstanceInsecure.post(
        this.baseUrl(`/register`),
        registerDto
      );

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on /auth!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  // reset a user email

  async findByEmail(
    email: string
  ): Promise<ApiResponse<FindByEmailResDto | null>> {
    try {
      const res = await axiosInstanceInsecure.get(
        this.baseUrl(`/user?email=${email}`)
      );

      return res.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  // refresh user ***************************************

  async createPassword(
    createPasswordDto: CreatePasswordDto
  ): Promise<ApiResponse<string>> {
    // hash the pass here

    try {
      const res = await axiosInstanceInsecure.post(
        this.baseUrl(`/create-password`),
        {
          ...createPasswordDto,
        }
      );
      return res.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

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
}

const authService = new AuthService();
export default authService;
