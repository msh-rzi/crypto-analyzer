import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AssetModule } from 'modules/asset/asset.module';
import { ExchangeModule } from 'modules/exchange/exchange.module';
import { TradingPairModule } from 'modules/trading-pair/trading-pair.module';
import { UserModule } from 'modules/user/user.module';
import { TelegramModule } from 'modules/telegram/telegram.module';
import { RobotModule } from 'modules/robot/robot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    TelegramModule,
    AssetModule,
    ExchangeModule,
    TradingPairModule,
    RobotModule,
  ],
  controllers: [],
})
export class AppModule {}
