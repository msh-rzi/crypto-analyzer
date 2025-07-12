import { Body, Controller, Logger, OnModuleInit, Post } from '@nestjs/common';
import { RobotBaseService } from './service/robot-base.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UserBaseService } from 'modules/user/services/user-base.service';
import { ConfigService } from '@nestjs/config';

@Controller('RobotController')
export class RobotController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: RobotBaseService,
    private readonly user: UserBaseService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_ROBOTS');
    if (shouldInitData === 'false') return;

    const users = await this.user.getAll();
    if (!users?.data) return;
    users.data.forEach(u => {
      if (!u.telegram?.id) {
        this.logger.error('The user has not any telegram bot');
        return;
      }
      this.createRobot({
        userId: u.id,
        name: 'News' + u.username + 'Bot',
        telegramId: u.telegram.id,
        strategy: 'all',
        config: { json: 'test' },
      });
    });
  }

  @Post()
  async createRobot(@Body() robot: CreateRobotDto) {
    return this.base.createRobot(robot);
  }
}
