import { Module } from '@nestjs/common';
import { RobotController } from './robot.controller';
import { RobotBaseService } from './service/robot-base.service';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RobotController],
  providers: [RobotBaseService],
  exports: [RobotBaseService],
})
export class RobotModule {}
