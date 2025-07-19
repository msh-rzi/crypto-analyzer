import { Body, Controller, Logger, OnModuleInit, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetBaseService } from './services/asset-base.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ConfigService } from '@nestjs/config';
import { CoinGeckoService } from 'shared/services/CoinGeckoService';

@ApiTags('Asset Controller')
@Controller('/asset')
export class AssetController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: AssetBaseService,
    private readonly configService: ConfigService,
    private readonly coinGeckoService: CoinGeckoService,
  ) {}

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_ASSETS');
    if (shouldInitData === 'false') return;

    const marketData = await this.coinGeckoService.getMarketData({
      vs_currency: 'usd',
    });

    const sortedByMarketCapRank = marketData.sort((a, b) => {
      const rankA = a.market_cap_rank ?? Infinity;
      const rankB = b.market_cap_rank ?? Infinity;
      return rankA - rankB;
    });

    const createManyArray: CreateAssetDto[] = [];

    sortedByMarketCapRank.forEach(raw => {
      createManyArray.push({
        symbol: raw.symbol ?? 'N/A',
        name: raw.name ?? 'N/A',
        coinGeckoId: raw.id ?? 'N/A',
        coinMarketCapId: 'N/A',
        marketCap: raw.market_cap?.toString() ?? 'N/A',
        marketCapRank: raw?.market_cap_rank ?? -1,
        image: raw?.image ?? 'N/A',
      });
    });

    const result = await this.base.createAssetsBatch(createManyArray);
    this.logger.log(result);
  }

  @Post('create-asset')
  async createAsset(@Body() asset: CreateAssetDto) {
    return this.base.createAsset(asset);
  }
}
