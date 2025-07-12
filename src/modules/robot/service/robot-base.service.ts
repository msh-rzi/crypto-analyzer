import { Injectable, Logger } from '@nestjs/common';
import { CreateRobotDto } from '../dto/create-robot.dto';
import { UserBaseService } from 'modules/user/services/user-base.service';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';

@Injectable()
export class RobotBaseService {
  logger = new Logger();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userBase: UserBaseService,
  ) {}

  async createRobot(raw: CreateRobotDto) {
    try {
      const user = await this.userBase.findById({
        id: raw.userId,
      });

      if (!user.data) return user;

      const isDuplicate = await this.prismaService.telegram.findFirst({
        where: {
          userId: raw.userId,
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create robot with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const robot = await this.prismaService.robot.create({
        data: {
          ...raw,
          isActive: true,
        },
      });

      this.logger.log('Robot created successfully');

      return {
        isSuccess: true,
        data: robot,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create robot with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
