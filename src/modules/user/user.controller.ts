import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBaseService } from './services/user-base.service';
import { ConfigService } from '@nestjs/config';

@Controller('UserController')
export class UserController implements OnModuleInit {
  constructor(
    private readonly base: UserBaseService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_USERS');
    if (shouldInitData === 'false') return;

    await this.createUser({
      email: 'user.user@gmail.com',
      username: 'imehdi',
    });
    await this.createUser({
      email: 'user.admin@gmail.com',
      username: 'iadmin',
    });
  }

  @Post('create-user')
  async createUser(@Body() user: CreateUserDto) {
    return this.base.createUser(user);
  }
}
