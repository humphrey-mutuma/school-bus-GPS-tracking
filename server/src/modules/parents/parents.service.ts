import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateParentDto, ParentResDto } from './dto/parent.dto';

@Injectable()
export class ParentsService {
  constructor(private prisma: DatabaseService) {}

  /**
   * Creates a new parent.
   * @param createParentDto - DTO containing parent details.
   * @returns The newly created parent.
   */
  async createParent(createParentDto: CreateParentDto): Promise<string> {
    const { email, name } = createParentDto;
    // Create the User and parent in a transaction
    const parent = await this.prisma.$transaction(async (prisma) => {
      // Step 1: Create the User with parent role and null password
      const user = await prisma.user.create({
        data: {
          email: email,
          password: null, // Password starts as null
          phoneNumber: createParentDto.phoneNumber,
          name: name,
          role: 'PARENT',
        },
      });

      // Step 2: Create the parent linked to the User
      const parent = await prisma.parent.create({
        data: {
          userId: user.id,
        },
      });

      return parent;
    });
    if (parent) {
      return 'parent created ';
    } else {
      throw new BadRequestException('Something went wrong!');
    }
  }

  /**
   * Fetches all parents.
   * @returns A list of all parents mapped to parentResponseDto.
   */
  async findAll(): Promise<ParentResDto[]> {
    const parents = await this.prisma.parent.findMany({
      include: {
        user: true,
        // students: { select: { user: { select: { name: true } } } },
      },
    });
    return parents.map((parent) => ({
      id: parent.id,
      name: parent.user.name,
      email: parent.user.email,
      phoneNumber: parent.user.phoneNumber,
      // students: parent.students.map((std) => std.user.name),
    }));
  }

  /**
   * Finds a parent by ID.
   * @param id - The unique ID of the parent.
   * @returns The parent details or null if not found.
   */
  async findOne(id: string): Promise<ParentResDto> {
    const parent = await this.prisma.parent.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!parent) return null;

    return {
      id: parent.id,
      name: parent.user.name,
      email: parent.user.email,
      phoneNumber: parent.user.phoneNumber,
    };
  }

  /**
   * Deletes a parent by ID.
   * @param id - The unique ID of the parent.
   * @returns The deleted parent.
   */
  async remove(id: string): Promise<string> {
    await this.prisma.parent.delete({
      where: { id },
    });
    return 'parent deleted';
  }
}
