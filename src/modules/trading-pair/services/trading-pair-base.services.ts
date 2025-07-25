import { Injectable, Logger } from '@nestjs/common';
import { CreateTradingPairDto } from '../dto/create-trading-pair.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  NOT_FOUND,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';
import { ExchangeBaseService } from 'modules/exchange/services/exchange-base.service';

@Injectable()
export class TradingPairBaseService {
  logger = new Logger();
  constructor(
    private readonly prismaService: PrismaService,
    private readonly exchangeBase: ExchangeBaseService,
  ) {}

  async createTradingPair(raw: CreateTradingPairDto) {
    try {
      // TODO: must add exchange search too

      const exchangeData = await this.exchangeBase.findById(raw.exchangeId);
      if (!exchangeData.data) {
        this.logger.error('Failed to find exchange data');
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      const isDuplicate = await this.prismaService.tradingPair.findFirst({
        where: {
          symbol: raw.symbol,
          exchangeId: exchangeData.data.id,
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create trading pair with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const createdTradingPair = await this.prismaService.tradingPair.create({
        data: {
          ...raw,
          isActive: true,
        },
      });
      this.logger.log('Trading Pair added successfully');
      return {
        isSuccess: true,
        data: createdTradingPair,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create trading pair with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
