 import { axiosInstance, axiosInstanceInsecure } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";
import { CreateParentDto, ParentResDto } from "./dto/parent.dto";

class ParentsService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `/api/parents${endpoint}`;
  }

  // authenticate user ***************************************************

  async createParent(
    createParentDto: CreateParentDto
  ): Promise<ApiResponse<string>> {
    try {
      const res = await axiosInstanceInsecure.post(
        this.baseUrl(``),
        createParentDto
      );

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  async findParent(id: string): Promise<ApiResponse<ParentResDto>> {
    try {
      const res = await axiosInstanceInsecure.get(this.baseUrl(`/${id}`));

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
  async findParents(): Promise<ApiResponse<ParentResDto[]>> {
    try {
      const res = await axiosInstanceInsecure.get(this.baseUrl(``));

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
  async deleteParent(id: string): Promise<ApiResponse<string>> {
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

const parentsService = new ParentsService();
export default parentsService;
