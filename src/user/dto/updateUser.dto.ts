import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validator/emailIsUnique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'name não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail não é válido' })
  @EmailIsUnique({ message: 'usuário já cadastrado' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha não pode conter menos que 6 caractéres' })
  @IsOptional()
  password: string;
}
