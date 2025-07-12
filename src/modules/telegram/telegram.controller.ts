import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { TelegramBaseService } from './services/telegram-base.service';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { ConfigService } from '@nestjs/config';

@Controller('Telegram')
export class TelegramController implements OnModuleInit {
  constructor(
    private readonly base: TelegramBaseService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_TELEGRAM');
    if (shouldInitData === 'false') return;

    await this.createTelegram({
      botToken: 'bot_token_test',
      chatId: 'chat_id_test',
      email: 'user.user@gmail.com',
      username: 'imehdi',
    });

    await this.createTelegram({
      botToken: 'bot_token_test1',
      chatId: 'chat_id_test1',
      email: 'user.admin@gmail.com',
      username: 'iadmin',
    });
  }

  @Post()
  async createTelegram(@Body() telegram: CreateTelegramDto) {
    return this.base.createTelegram(telegram);
  }
}
