import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse } from "@/types/ApiResponse";
import { handleAxiosError } from "@/utils/errorhandler";
import { CreateStudentDto, FindStudentDto } from "./dto/student.dto";

class StudentsService {
  // Helper method to create full URLs
  private baseUrl(endpoint: string): string {
    return `/api/Students${endpoint}`;
  }

  // authenticate user ***************************************************

  async createStudent(
    createStudentDto: CreateStudentDto
  ): Promise<ApiResponse<string>> {
    try {
      const res = await axiosInstance.post(this.baseUrl(``), createStudentDto);

      if (res.status == 201) {
        return res.data;
      } else {
        throw new Error(`Something went wrong on!`);
      }
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }

  async findStudent(id: string): Promise<ApiResponse<FindStudentDto>> {
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
  async findStudents(): Promise<ApiResponse<FindStudentDto[]>> {
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
  async deleteStudent(id: string): Promise<ApiResponse<string>> {
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

const studentsService = new StudentsService();
export default studentsService;
