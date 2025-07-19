import { Body, Controller, Logger, OnModuleInit, Post } from '@nestjs/common';
import { CreateTradingPairDto } from './dto/create-trading-pair.dto';
import { TradingPairBaseService } from './services/trading-pair-base.services';
import { BitcoinTickers } from 'database/raw-data/bitcoin_tickers';
import { RippleTickers } from 'database/raw-data/ripple_tickers';
import { ConfigService } from '@nestjs/config';
import { AssetBaseService } from 'modules/asset/services/asset-base.service';
import { ExchangeBaseService } from 'modules/exchange/services/exchange-base.service';

@Controller('TradingPair')
export class TradingPairController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: TradingPairBaseService,
    private readonly configService: ConfigService,
    private readonly assetBase: AssetBaseService,
    private readonly exchangeBase: ExchangeBaseService,
  ) {}

  onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_TRADING_PAIRS');
    if (shouldInitData === 'false') return;

    BitcoinTickers.tickers.forEach(async (raw, indx) => {
      if (indx > 10) return;

      const baseAsset = await this.assetBase.findById(raw.base.toLowerCase());
      const quoteAsset = await this.assetBase.findById(
        raw.target.toLowerCase(),
      );
      const exchange = await this.exchangeBase.findBySymbol(
        raw.market.identifier,
      );

      if (baseAsset.data && quoteAsset.data && exchange.data) {
        this.createTradingPair({
          symbol: `${baseAsset.data.symbol}/${quoteAsset.data.symbol}`,
          baseAssetId: baseAsset.data.id,
          quoteAssetId: quoteAsset.data.id,
          exchangeId: exchange.data.id,
          minTradeAmount: '1',
          maxTradeAmount: '1000000',
          tickSize: '0.01',
          stepSize: '0.01',
        });
      }
    });
  }

  @Post()
  async createTradingPair(@Body() raw: CreateTradingPairDto) {
    return this.base.createTradingPair(raw);
  }
}
