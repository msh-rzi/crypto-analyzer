import { Module } from '@nestjs/common';
import { AssetMetricController } from './asset-metric.controller';
import { AssetMetricBaseService } from './services/asset-metric-base.service';
import { AssetModule } from 'modules/asset/asset.module';
import { ExchangeModule } from 'modules/exchange/exchange.module';

@Module({
  imports: [AssetModule, ExchangeModule],
  controllers: [AssetMetricController],
  providers: [AssetMetricBaseService],
  exports: [AssetMetricBaseService],
})
export class AssetMetricModule {}
