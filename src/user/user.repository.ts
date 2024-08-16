import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private createdUsers = [];

  async create(user: any) {
    this.createdUsers.push(user);
  }

  async list() {
    return this.createdUsers;
  }

  async checkIfEmailExists(email: string) {
    const emailExists = this.createdUsers.some((user) => user.email === email);
    return emailExists;
  }
}
