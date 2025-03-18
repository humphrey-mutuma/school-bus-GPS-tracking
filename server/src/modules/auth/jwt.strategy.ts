import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/db/db.service';
import { SessionUserDto } from 'src/modules/auth/dto/sessionUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: SessionUserDto) {
    if (!payload) {
      throw new UnauthorizedException(
        'Something went wrong! Not authenticated',
      );
    }

    // TODO: cache this user to redis
    // we can verify the logged in user from DB or just proceed
    // const user = await this.prisma.user.findUnique({
    //   where: { username: payload.username },
    //   select: {
    //     id: true,
    //   },
    // });
    // console.log('dfs', user);

    const user = {
      id: payload.id,
      email: payload.email,
    };

    if (!user) {
      return null; // This will trigger an UnauthorizedException
    }
    return user;
  }
}
