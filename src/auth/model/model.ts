import { IsEmail, IsString, IsNotEmpty, IsByteLength } from 'class-validator';

export class ILogin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(4, 12)
  password: string;
}

export class IRegister {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(4, 12)
  password: string;
}
