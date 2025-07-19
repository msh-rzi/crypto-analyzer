import { Body, Controller, Logger, OnModuleInit, Post } from '@nestjs/common';
import { CreateAssetMetricDto } from './dto/create-asset-metric.dto';
import { AssetMetricBaseService } from './services/asset-metric-base.service';
import { ConfigService } from '@nestjs/config';
import { AssetBaseService } from 'modules/asset/services/asset-base.service';
import { ExchangeBaseService } from 'modules/exchange/services/exchange-base.service';
import { BitcoinMarketChart } from 'database/raw-data/bitcoin_market_chart';
import { MarketData } from 'database/raw-data/market_data';

@Controller('AssetMetric')
export class AssetMetricController implements OnModuleInit {
  constructor(
    private readonly base: AssetMetricBaseService,
    private readonly asset: AssetBaseService,
    private readonly exchange: ExchangeBaseService,
    private readonly configService: ConfigService,
  ) {}
  logger = new Logger();

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_ASSET_METRICS');
    if (shouldInitData === 'false') return;

    const asset = await this.asset.findBySymbol('btc');
    const exchange = await this.exchange.findBySymbol('binance');

    if (!asset.data) return this.logger.error('Asset btc not found');
    if (!exchange.data) return this.logger.error('Exchange binance not found');

    const btcMeta = MarketData.find(c => c.id === 'bitcoin');
    if (!btcMeta) return this.logger.error('bitcoin MarketData not found');

    console.log('first');
    BitcoinMarketChart.prices.forEach(([timestamp, price], index) => {
      this.createAssetMetric({
        assetId: asset.data.id,
        exchangeId: exchange.data.id,
        timestamp: new Date(timestamp),
        price: price.toString(),
        volume24h:
          BitcoinMarketChart.total_volumes[index][1].toString() ??
          btcMeta.total_volume ??
          '0',
        marketCap:
          BitcoinMarketChart.market_caps[index][1].toString() ??
          btcMeta.market_cap?.toString(),
        priceChange24h: btcMeta.price_change_24h?.toString(),
        priceChangePercentage1h:
          btcMeta.price_change_percentage_1h_in_currency?.toString(),
        priceChangePercentage24h:
          btcMeta.price_change_percentage_24h_in_currency?.toString(),
        priceChangePercentage7d:
          btcMeta.price_change_percentage_7d_in_currency?.toString(),
        marketCapRank: btcMeta.market_cap_rank,
        high24h: btcMeta.high_24h?.toString(),
        low24h: btcMeta.low_24h?.toString(),
        circulatingSupply: btcMeta.circulating_supply?.toString(),
        totalSupply: btcMeta.total_supply?.toString(),
        quoteVolume24h: btcMeta.total_volume?.toString(),
      });
    });
  }

  @Post()
  async createAssetMetric(@Body() assetMetric: CreateAssetMetricDto) {
    return this.base.createAssetMetric(assetMetric);
  }
}
