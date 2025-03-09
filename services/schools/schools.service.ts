import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";
import { CreateSchoolDto, SchoolResDto } from "./dto/school.dto";

class SchoolsService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `/api/schools${endpoint}`;
  }

  // authenticate user ***************************************************

  async createSchool(
    createSchoolDto: CreateSchoolDto
  ): Promise<ApiResponse<string>> {
    try {
      const res = await axiosInstance.post(this.baseUrl(``), createSchoolDto);

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  async findSchool(id: string): Promise<ApiResponse<SchoolResDto>> {
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
  async findSchools(): Promise<ApiResponse<SchoolResDto[]>> {
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
  async deleteSchool(id: string): Promise<ApiResponse<string>> {
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

const schoolsService = new SchoolsService();
export default schoolsService;
