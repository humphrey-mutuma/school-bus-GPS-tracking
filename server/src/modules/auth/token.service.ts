import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionUserDto } from 'src/modules/auth/dto/sessionUser.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  // generate access token
  async generateAccessToken(userId: string, username: string): Promise<string> {
    const payload = {
      id: userId,
      username: username,
      // ...
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
    });
  }
  // generate refresh token
  async generateRefreshToken(username: string): Promise<string> {
    const payload = {
      username: username,
      // ...
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: '7d',
    });
  }

  // validate token
  async validateRefreshToken(refreshToken: string): Promise<{ id: string }> {
    try {
      // Verify and decode the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return payload; // Return the decoded payload if token is valid
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // validate token
  async generateMagicLinkToken(id: string, email: string): Promise<string> {
    try {
      const token = this.jwtService.sign(
        { id: id, email: email },
        { secret: process.env.JWT_VERIFY_EMAIL_SECRET, expiresIn: '1h' },
      );
      return token; // Return the decoded payload if token is valid
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // validate token
  async verifyMagicLinkToken(
    token: string,
  ): Promise<{ id: string; email: string }> {
    try {
      // Verify the token
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFY_EMAIL_SECRET,
      });
      // Return the decoded payload if token is valid
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  /**
   * Verify a JWT token and return its payload
   * @param token The JWT token to verify
   * @returns Decoded payload
   * @throws Error if token is invalid or expired
   */
  verifyToken(token: string): SessionUserDto {
    try {
      return this.jwtService.verify<SessionUserDto>(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
