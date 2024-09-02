import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { randomUUID } from 'node:crypto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}
  @Post()
  async registerUser(@Body() user: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.id = randomUUID();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    this.userRepository.create(userEntity);

    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listUsers() {
    const savedUsers = await this.userRepository.list();
    const users = savedUsers.map((user) => new ListUserDTO(user.id, user.name));

    return users;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() newUserData: UpdateUserDTO,
  ) {
    const updatedUser = await this.userRepository.updateUser(id, newUserData);
    return {
      user: new ListUserDTO(updatedUser.id, updatedUser.name),
      message: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.deleteUser(id);
    return {
      user: new ListUserDTO(deletedUser.id, deletedUser.name),
      message: 'usuário deletado com sucesso',
    };
  }
}
