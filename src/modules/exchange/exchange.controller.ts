import { Body, Controller, Logger, OnModuleInit } from '@nestjs/common';
import { ExchangeBaseService } from './services/exchange-base.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchanges } from 'database/raw-data/exchanges';
import { ConfigService } from '@nestjs/config';
import { CoinGeckoService } from 'shared/services/CoinGeckoService';

@Controller('ExchangeController')
export class ExchangeController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: ExchangeBaseService,
    private readonly configService: ConfigService,
    private readonly coinGeckoService: CoinGeckoService,
  ) {}

  async onModuleInit() {
    const shouldInitData = this.configService.get<string>('INIT_EXCHANGES');
    if (shouldInitData === 'false') return;

    const exchanges = await this.coinGeckoService.getExchanges();

    exchanges.forEach(e => {
      this.createExchange({
        symbol: e.id,
        name: e.name,
        image: e.image,
        description: e.description,
        country: e.country,
        makerFee: 'N/A',
        takerFee: 'N/A',
        apiUrl: e.url,
      });
    });
  }

  async createExchange(@Body() exchange: CreateExchangeDto) {
    return this.base.createExchange(exchange);
  }
}
