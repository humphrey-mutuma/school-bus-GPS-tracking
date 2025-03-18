import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateSchoolDto, SchoolResDto } from './dto/school.dto';

@Injectable()
export class SchoolsService {
  constructor(private prisma: DatabaseService) {}

  /**
   * Creates a new school.
   * @param createSchoolDto - DTO containing school name and address.
   * @returns The newly created school.
   */
  async create(
    userId: string,
    createSchoolDto: CreateSchoolDto,
  ): Promise<string> {
    const { name, address } = createSchoolDto;

    // Step 1: Create the User with DRIVER role and null password
    const school = await this.prisma.school.create({
      data: {
        name,
        address,
        adminId: userId,
      },
    });

    if (school) {
      return 'School created ';
    } else {
      throw new BadRequestException('Something went wrong!');
    }
  }

  /**
   * Fetches all schools.
   * @returns A list of all schools.
   */
  async findAll(): Promise<SchoolResDto[]> {
    const school = await this.prisma.school.findMany({
      include: { admin: true },
    });

    return school.map((school) => ({
      id: school.id,
      name: school.name,
      address: school.address,
      admin: school.admin.name,
    }));
  }

  /**
   * Finds a school by ID.
   * @param id - The unique ID of the school.
   * @returns The school details or null if not found.
   */
  async findOne(id: string): Promise<SchoolResDto> {
    const school = await this.prisma.school.findUnique({
      where: { id },
      include: { admin: true },
    });
    return {
      id: school.id,
      name: school.name,
      address: school.address,
      admin: school.admin.name,
    };
  }

  /**
   * Deletes a school by ID.
   * @param id - The unique ID of the school.
   * @returns The deleted school.
   */
  async remove(id: string) {
    await this.prisma.school.delete({
      where: { id },
    });
    return 'School deleted';
  }
}
