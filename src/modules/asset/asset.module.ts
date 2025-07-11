import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetBaseService } from './services/asset-base.service';

@Module({
  controllers: [AssetController],
  providers: [AssetBaseService],
  exports: [AssetBaseService],
})
export class AssetModule {}
