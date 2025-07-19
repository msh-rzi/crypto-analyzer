import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'shared/prisma/prisma.service';
import { CreateTelegramDto } from '../dto/create-telegram.dto';
import {
  DUPLICATE_ERROR,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';
import { UserBaseService } from 'modules/user/services/user-base.service';

@Injectable()
export class TelegramBaseService {
  logger = new Logger();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userBase: UserBaseService,
  ) {}

  async createTelegram(raw: CreateTelegramDto) {
    try {
      const user = await this.userBase.findByEmailAndUsername({
        email: raw.email,
        username: raw.username,
      });

      if (!user.data) return user;

      const isDuplicate = await this.prismaService.telegram.findFirst({
        where: {
          userId: user.data.id,
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create telegram with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const telegram = await this.prismaService.telegram.create({
        data: {
          userId: user.data.id,
          botToken: raw.botToken,
          chatId: raw.chatId,
          isActive: true,
        },
      });

      this.logger.log('Telegram created successfully');

      return {
        isSuccess: true,
        data: telegram,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create telegram with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
