import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateDriverDto, DriverResDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: DatabaseService) {}

  /**
   * Creates a new driver.
   * @param createDriverDto - DTO containing driver details.
   * @returns The newly created driver.
   */
  async createDriver(
    userId: string,
    createDriverDto: CreateDriverDto,
  ): Promise<string> {
    const { carNumberPlate, name, phoneNumber, email } = createDriverDto;

    const in_session_user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { school: true },
    });

    if (!in_session_user.school.id) {
      throw new BadRequestException('No school registered with you!');
    }

    // Step 1: Create the User with DRIVER role and null password
    const user = await this.prisma.user.create({
      data: {
        password: null, // Password starts as null
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        role: 'DRIVER',
      },
      select: { id: true },
    });

    if (user) {
      // Step 2: Create the Driver linked to the User
      await this.prisma.driver.create({
        data: {
          userId: user.id,
          carPlateNumber: carNumberPlate,
          schoolId: in_session_user.school.id,
        },
      });

      return 'Driver created ';
    } else {
      throw new BadRequestException('Something went wrong!');
    }
  }

  /**
   * Fetches all drivers.
   * @returns A list of all drivers mapped to DriverResponseDto.
   */
  async findAll(userId: string): Promise<DriverResDto[]> {
    const in_session_user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        school: true,
        parent: { select: { student: { select: { schoolId: true } } } },
        driver: true,
      },
    });
    const drivers = await this.prisma.driver.findMany({
      where:
        in_session_user.role == 'ADMIN'
          ? { schoolId: in_session_user.school.id }
          : in_session_user.role == 'PARENT'
            ? { schoolId: in_session_user.parent.student.schoolId }
            : { schoolId: in_session_user.driver.schoolId },
      include: { user: true },
    });
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.user.name,
      email: driver.user.email,
      phoneNumber: driver.user.phoneNumber,
      carNumberPlate: driver.carPlateNumber,
    }));
  }

  /**
   * Finds a driver by ID.
   * @param id - The unique ID of the driver.
   * @returns The driver details or null if not found.
   */
  async findOne(id: string): Promise<DriverResDto | null> {
    const driver = await this.prisma.driver.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!driver) return null;

    return {
      id: driver.id,
      name: driver.user.name,
      email: driver.user.email,
      phoneNumber: driver.user.phoneNumber,
      carNumberPlate: driver.carPlateNumber,
    };
  }

  /**
   * Deletes a driver by ID.
   * @param id - The unique ID of the driver.
   * @returns The deleted driver.
   */
  async remove(id: string): Promise<string> {
    await this.prisma.driver.delete({
      where: { id },
    });
    return 'Driver deleted';
  }
}
