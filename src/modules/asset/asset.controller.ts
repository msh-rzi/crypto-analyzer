import { Body, Controller, Logger, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetBaseService } from './services/asset-base.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { MarketData } from 'database/raw-data/market_data';
import { ConfigService } from '@nestjs/config';

@ApiTags('Asset Controller')
@Controller('/asset')
export class AssetController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: AssetBaseService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const shouldInitData = this.configService.get<boolean>('INIT_ASSETS');
    console.log('init assets', shouldInitData);
    if (Boolean(shouldInitData)) return;

    const sortedMarketDataByMarketRank = MarketData.sort(
      (a, b) => a.market_cap_rank - b.market_cap_rank,
    );

    sortedMarketDataByMarketRank.forEach(rawAsset => {
      this.createAsset({
        symbol: rawAsset.symbol,
        name: rawAsset.name,
        coinGeckoId: rawAsset.id,
        coinMarketCapId: rawAsset.id,
        marketCap: rawAsset.market_cap.toString(),
        marketCapRank: rawAsset.market_cap_rank,
      });
    });
  }

  @Post('create-asset')
  async createAsset(@Body() asset: CreateAssetDto) {
    return this.base.createAsset(asset);
  }
}
