import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password is too weak',
  })
  password: string;
}

export interface AuthRegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthCredentialsDto {
  password: string;
  name: string;
}
