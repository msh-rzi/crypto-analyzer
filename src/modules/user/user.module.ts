import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserBaseService } from './services/user-base.service';

@Module({
  controllers: [UserController],
  providers: [UserBaseService],
  exports: [UserBaseService],
})
export class UserModule {}
