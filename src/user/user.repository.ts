import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private createdUsers: UserEntity[] = [];

  async create(user: UserEntity) {
    this.createdUsers.push(user);
  }

  async list() {
    return this.createdUsers;
  }

  async checkIfEmailExists(email: string) {
    const emailExists = this.createdUsers.some((user) => user.email === email);
    return emailExists;
  }

  async updateUser(id: string, newUserData: Partial<UserEntity>) {
    const userExists = this.createdUsers.find((user) => user.id === id);

    if (!userExists) {
      throw new Error('usuário não cadastrado');
    }

    Object.entries(newUserData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      userExists[key] = value;
    });

    return userExists;
  }
}
