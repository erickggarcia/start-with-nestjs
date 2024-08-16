import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { EmailIsUniqueValidator } from './validator/emailIsUnique.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailIsUniqueValidator],
})
export class userModule {}
