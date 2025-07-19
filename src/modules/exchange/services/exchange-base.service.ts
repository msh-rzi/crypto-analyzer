import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  NOT_FOUND,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';

@Injectable()
export class ExchangeBaseService {
  logger = new Logger();
  constructor(private readonly prismaService: PrismaService) {}

  async createExchange(raw: CreateExchangeDto) {
    try {
      const isDuplicate = await this.prismaService.exchange.findFirst({
        where: {
          symbol: raw.symbol,
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create exchange with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const createdExchange = await this.prismaService.exchange.create({
        data: {
          ...raw,
          isActive: true,
          isTracked: true,
        },
      });
      this.logger.log('Exchange added successfully');
      return {
        isSuccess: true,
        data: createdExchange,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create asset with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
  async findById(id: number) {
    try {
      const exchange = await this.prismaService.exchange.findFirst({
        where: {
          id,
        },
      });

      if (!exchange) {
        this.logger.warn('Exchange not found : ' + id);
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      return {
        isSuccess: true,
        data: exchange,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to find exchange with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
  async findBySymbol(symbol: string) {
    try {
      const exchange = await this.prismaService.exchange.findFirst({
        where: {
          symbol,
        },
      });

      if (!exchange) {
        this.logger.warn('Exchange not found : ' + symbol);
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      return {
        isSuccess: true,
        data: exchange,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to find exchange with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
