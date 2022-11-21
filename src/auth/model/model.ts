import { IsEmail, IsString, IsNotEmpty, IsByteLength } from 'class-validator';

export class Login_dto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(4, 12)
  password: string;
}

export class Register_dto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(4, 12)
  password: string;
}
