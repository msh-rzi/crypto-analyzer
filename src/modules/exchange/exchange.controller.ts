import { Body, Controller, Logger, OnModuleInit } from '@nestjs/common';
import { ExchangeBaseService } from './services/exchange-base.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchanges } from 'database/raw-data/exchanges';
import { ConfigService } from '@nestjs/config';

@Controller('ExchangeController')
export class ExchangeController implements OnModuleInit {
  logger = new Logger();
  constructor(
    private readonly base: ExchangeBaseService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const shouldInitData = this.configService.get<boolean>('INIT_EXCHANGES');
    if (Boolean(shouldInitData)) return;

    const sortedExchangesByScoreRank = Exchanges.sort(
      (a, b) => a.trust_score_rank - b.trust_score_rank,
    );

    sortedExchangesByScoreRank.forEach(e => {
      this.createExchange({
        symbol: e.id,
        name: e.name,
        country: e.country,
        makerFee: '0.0002',
        takerFee: '0.00015',
        apiUrl: e.url,
      });
    });
  }

  async createExchange(@Body() exchange: CreateExchangeDto) {
    return this.base.createExchange(exchange);
  }
}
