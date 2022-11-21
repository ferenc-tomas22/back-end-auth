import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { JwtService } from '@nestjs/jwt/dist';
import * as argon2 from 'argon2';

import { Login_dto, Register_dto } from './model';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: Login_dto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email is not registered');
    }
    const valid = await argon2.verify(user.password, dto.password);
    if (!valid) {
      throw new ForbiddenException('Invalid password');
    }
    return { authToken: await this.signToken(user.id) };
  }

  async register(dto: Register_dto) {
    const hash = await argon2.hash(dto.password);
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      return 'Registration successful';
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw err;
    }
  }

  signToken(userId: string) {
    return this.jwt.signAsync(
      {
        sub: userId,
        iss: this.config.get('JWT_ISSUER'),
        aud: this.config.get('JWT_AUDIENCE_USER'),
      },
      {
        expiresIn: this.config.get('JWT_EXPIRATION'),
        secret: this.config.get('JWT_SECRET'),
      },
    );
  }
}
