import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['jwt'] ?? null;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: { sub: string }) {
    return payload ? { userId: payload.sub } : null;
  }
}
