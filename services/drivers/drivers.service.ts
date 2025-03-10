import { CreateDriverDto, DriverResDto } from "./dto/driver.dto";
import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";

class DriversService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `drivers${endpoint}`;
  }

  // authenticate user ***************************************************

  async createDriver(
    createDriverDto: CreateDriverDto
  ): Promise<ApiResponse<string>> {
    try {
      const res = await axiosInstance.post(this.baseUrl(``), createDriverDto);

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  async findDriver(id: string): Promise<ApiResponse<DriverResDto>> {
    try {
      const res = await axiosInstance.get(this.baseUrl(`/${id}`));

      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  // reset a user email
  async findDrivers(): Promise<ApiResponse<DriverResDto[]>> {
    try {
      const res = await axiosInstance.get(this.baseUrl(``));

      if (res.status == 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong !`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  // log a user out
  async deleteDriver(id: string): Promise<ApiResponse<string>> {
    //  protected route
    if (!id) {
      throw new Error(`Not Authorized!`);
    }
    try {
      const res = await axiosInstance.delete(this.baseUrl(`/${id}`), {});

      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(`Something went wrong!: `);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }
}

const driversService = new DriversService();
export default driversService;
