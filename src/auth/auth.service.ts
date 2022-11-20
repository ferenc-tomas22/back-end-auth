import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { login_dto, register_dto } from './model/model';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: login_dto) {
    const { email, password } = dto;
  }

  async register(dto: register_dto) {
    const { email, password } = dto;
    const hashedPassword = await argon2.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return `User ${user.email} created`;
    } catch (err) {
      console.log(err);
    }
  }
}
