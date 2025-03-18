import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateStudentDto, FindStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: DatabaseService) {}

  async create(
    userId: string,
    createStudentDto: CreateStudentDto,
  ): Promise<string> {
    // Fetch the school where the admin is assigned
    const adminSchool = await this.prisma.school.findFirst({
      where: { adminId: userId },
      select: { id: true },
    });

    if (!adminSchool) {
      throw new NotFoundException('No School found!');
    }

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // Create parent user
        const parentUser = await prisma.user.create({
          data: {
            name: createStudentDto.parentName,
            email: createStudentDto.parentEmail,
            password: null,
            role: 'PARENT',
          },
        });

        // Create parent record
        const parent = await prisma.parent.create({
          data: { userId: parentUser.id },
        });

        // Create student user
        const studentUser = await prisma.user.create({
          data: {
            name: createStudentDto.name,
            role: 'STUDENT',
            email: null,
            password: null,
          },
        });

        // Create student record linked to parent and school
        await prisma.student.create({
          data: {
            userId: studentUser.id,
            schoolId: adminSchool.id,
            parentId: parent.id,
          },
        });

        return studentUser.id;
      });
      if (result) {
        return `Student created successfully `;
      } else {
        throw new BadRequestException('Something went wrong during creation');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      throw new BadRequestException('Something went wrong during creation');
    }
  }

  async findAll(userId: string): Promise<FindStudentDto[]> {
    const in_session_user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { school: true, parent: true, driver: true },
    });
    const students = await this.prisma.student.findMany({
      where:
        in_session_user.role == 'ADMIN'
          ? { schoolId: in_session_user.school.id } // all students in your school
          : in_session_user.role == 'PARENT'
            ? { parentId: in_session_user.parent.id } // parent - only return our kids
            : { schoolId: in_session_user.driver.schoolId }, // all kids in your school
      include: {
        user: {
          select: { email: true, name: true, createdAt: true },
        },
        school: { select: { name: true } },
        parent: { select: { user: true } },
      },
    });

    return students.map((student) => ({
      id: student.id,
      name: student.user.name,
      parentName: student.parent.user.name,
      parentEmail: student.parent.user.email,
    }));
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findFirst({
      where: { id },
      include: {
        user: true,
        school: true,
        parent: { select: { user: true } },
      },
    });

    if (!student) {
      return null; // Or throw NotFoundException if preferred
    }

    return {
      id: student.id,
      name: student.user.name,
      parentName: student.parent.user.name,
      parentEmail: student.parent.user.email,
    };
  }

  async remove(id: string): Promise<string> {
    // Delete both Student and associated User in a transaction
    await this.prisma.$transaction(async (prisma) => {
      await prisma.student.delete({ where: { id } });
      // await prisma.user.delete({ where: {   } });
    });

    return `Student #${id} and associated user removed`;
  }
}
