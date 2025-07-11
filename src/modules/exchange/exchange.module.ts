import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeBaseService } from './services/exchange-base.service';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeBaseService],
  exports: [ExchangeBaseService],
})
export class ExchangeModule {}
