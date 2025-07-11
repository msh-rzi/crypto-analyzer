import { Module } from '@nestjs/common';
import { TradingPairController } from './trading-pair.controller';
import { TradingPairBaseService } from './services/trading-pair-base.services';
import { AssetModule } from 'modules/asset/asset.module';
import { ExchangeModule } from 'modules/exchange/exchange.module';

@Module({
  imports: [AssetModule, ExchangeModule],
  controllers: [TradingPairController],
  providers: [TradingPairBaseService],
  exports: [TradingPairBaseService],
})
export class TradingPairModule {}
