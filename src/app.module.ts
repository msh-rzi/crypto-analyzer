import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'modules/user/user.module';
import { TelegramModule } from 'modules/telegram/telegram.module';
import { AssetModule } from 'modules/asset/asset.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    TelegramModule,
    AssetModule,
    // ExchangeModule,
    // TradingPairModule,
    // RobotModule,
    // AssetMetricModule,
  ],
  controllers: [],
})
export class AppModule {}
