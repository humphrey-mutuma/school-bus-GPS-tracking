import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreatePasswordDto,
  FindByEmailResDto,
  LoginDto,
  LoginResDto,
  RegisterDto,
} from './dto/auth.dto';
import { DatabaseService } from 'src/db/db.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

// const refreshTokenCookieOptions: CookieOptions = {
//   httpOnly: true,
//   secure: true, // Use secure cookies in production
//   sameSite: 'strict', // Prevent CSRF attacks
//   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
// };

@Injectable()
export class AuthService {
  private readonly accessTokenExpTime = 60 * 24 * 60 * 7 * 1000; // 7 days in milliseconds
  private readonly refreshTokenExpTime = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds
  private readonly encoder = bcrypt; // Using bcrypt directly with 12 rounds

  constructor(
    private readonly prisma: DatabaseService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   *
   * @param username
   * @param password
   * @returns
   */
  async register(authenticateDto: RegisterDto): Promise<string> {
    const { name, email, password, phoneNumber, schoolName, schoolAddress } =
      authenticateDto;

    try {
      // Hash the password
      const hashedPassword = await this.encoder.hash(password, 12);

      // Use a transaction to ensure both user and school are created successfully
      const [newUser] = await this.prisma.$transaction([
        // Create user
        this.prisma.user.create({
          data: {
            name,
            email,
            phoneNumber: phoneNumber || null, // Handle optional field
            role: 'ADMIN',
            password: hashedPassword,
          },
        }),
        // We need the user ID first, so we'll handle school creation separately
      ]);

      // Create school with the new user's ID
      await this.prisma.school.create({
        data: {
          adminId: newUser.id,
          name: schoolName,
          address: schoolAddress || null, // Handle optional field
        },
      });

      return 'Successfully registered!';
    } catch (error) {
      // Handle specific Prisma errors

      console.error('Registration error:', error);
      throw new BadRequestException(
        'Registration failed. Please try again or contact support.',
      );
    }
  }
  /**
   *
   * @param username
   * @param password
   * @param user
   * @returns
   */
  async login(loginDto: LoginDto): Promise<LoginResDto> {
    const { email, password } = loginDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          password: true, // Hashed password for verification
          school: { select: { id: true, name: true, address: true } },
        },
      });
      const isPasswordValid = await this.encoder.compare(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          'Invalid credentials, please check your username or password!',
        );
      }

      const accessToken = await this.tokenService.generateAccessToken(
        user.id,
        user.email,
      );
      const refreshToken = await this.tokenService.generateRefreshToken(
        user.email,
      );

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        school: user.school,
      };
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid credentials, please check your username or password!',
      );
    }
  }

  /**
   * Refresh access token
   * @param refreshTokenDto
   * @returns
   */

  async findByEmail(email: string): Promise<FindByEmailResDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true }, // We only need to check if the user exists
    });

    if (user) {
      return {
        email,
        hasPassword: !!user.password,
      };
    }
    return null;
  }

  async createPassword(createPasswordDto: CreatePasswordDto): Promise<string> {
    const { email, password } = createPasswordDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        // hash pass
        await this.prisma.user.update({
          where: { email },
          data: {
            password: await this.encoder.hash(password, 12),
          },
        });
        return 'Password created successfully, kindly login';
      } else {
        throw new BadRequestException('Something went wrong!');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async forgotPassword(_username: string): Promise<string> {
    // Placeholder logic (implement email reset link)
    return 'Click the link sent to your email to reset your password';
  }

  async verifyUsername(_username: string): Promise<string> {
    // Placeholder logic (implement magic link or OTP)
    return '';
  }
}
