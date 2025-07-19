import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetMetricDto } from '../dto/create-asset-metric.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';

@Injectable()
export class AssetMetricBaseService {
  logger = new Logger();
  constructor(private readonly prismaService: PrismaService) {}

  async createAssetMetric(raw: CreateAssetMetricDto) {
    try {
      const isDuplicate = await this.prismaService.assetMetric.findFirst({
        where: {
          AND: [
            { assetId: raw.assetId },
            { exchangeId: raw.exchangeId },
            { timestamp: raw.timestamp },
          ],
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create asset metric with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const createdAssetMetric = await this.prismaService.assetMetric.create({
        data: {
          ...raw,
        },
      });

      this.logger.log('Asset metric added successfully');
      return {
        isSuccess: true,
        data: createdAssetMetric,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to create asset metric with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
