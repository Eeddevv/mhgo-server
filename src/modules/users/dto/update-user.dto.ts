import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly firstName?: string;

  @IsOptional()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly birthday?: string;

}