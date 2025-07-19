import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetBaseService } from './services/asset-base.service';
import { CoinGeckoService } from 'shared/services/CoinGeckoService';

@Module({
  controllers: [AssetController],
  providers: [AssetBaseService, CoinGeckoService],
  exports: [AssetBaseService],
})
export class AssetModule {}
