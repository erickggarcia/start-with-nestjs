import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}
  @Post()
  async registerUser(@Body() user: CreateUserDTO) {
    this.userRepository.create(user);
    return 'Usuário criado com sucesso';
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }
}
