import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { CONFIG_OPTIONS, defaultConfigOptions } from './config';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserValidator } from './user.validator';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserValidator,
    AuthGuard,
    { provide: CONFIG_OPTIONS, useValue: defaultConfigOptions },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
