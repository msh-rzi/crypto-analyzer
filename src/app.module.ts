import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from 'modules/asset/asset.module';
import { ExchangeModule } from 'modules/exchange/exchange.module';
import { TradingPairModule } from 'modules/trading-pair/trading-pair.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AssetModule,
    ExchangeModule,
    TradingPairModule,
  ],
  controllers: [],
})
export class AppModule {}
