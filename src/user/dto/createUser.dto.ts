import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validator/emailIsUnique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'name não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail não é válido' })
  @EmailIsUnique({ message: 'usuário já cadastrado' })
  email: string;

  @MinLength(6, { message: 'A senha não pode conter menos que 6 caractéres' })
  password: string;
}
