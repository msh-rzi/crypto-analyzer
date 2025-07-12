import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramBaseService } from './services/telegram-base.service';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TelegramController],
  providers: [TelegramBaseService],
  exports: [TelegramBaseService],
})
export class TelegramModule {}
