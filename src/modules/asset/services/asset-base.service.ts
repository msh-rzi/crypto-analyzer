import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetDto } from '../dto/create-asset.dto';
import { PrismaService } from 'shared/prisma/prisma.service';
import {
  DUPLICATE_ERROR,
  NOT_FOUND,
  SOMETHING_HAPPEN_ERROR,
} from 'shared/constants/errors';

@Injectable()
export class AssetBaseService {
  logger = new Logger();
  constructor(private readonly prismaService: PrismaService) {}

  async createAsset(raw: CreateAssetDto) {
    try {
      const isDuplicate = await this.prismaService.asset.findFirst({
        where: {
          symbol: raw.symbol,
        },
      });

      if (!!isDuplicate) {
        this.logger.error(
          'Failed to create asset with error : ' + DUPLICATE_ERROR,
        );
        return {
          isSuccess: false,
          data: null,
          statue_code: 409,
          error_cause: DUPLICATE_ERROR,
        };
      }

      const createdAsset = await this.prismaService.asset.create({
        data: {
          ...raw,
          isActive: true,
          isTracked: true,
        },
      });
      this.logger.log('Asset added successfully');
      return {
        isSuccess: true,
        data: createdAsset,
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

  async findById(id: string) {
    try {
      const asset = await this.prismaService.asset.findFirst({
        where: {
          symbol: id,
        },
      });

      if (!asset) {
        this.logger.warn('Asset not found : ' + id);
        return {
          isSuccess: false,
          data: null,
          statue_code: 404,
          error_cause: NOT_FOUND,
        };
      }

      return {
        isSuccess: true,
        data: asset,
        statue_code: 200,
        error_cause: null,
      };
    } catch (error) {
      this.logger.error('Failed to find asset with error : ' + error);
      return {
        isSuccess: false,
        data: null,
        statue_code: 500,
        error_cause: SOMETHING_HAPPEN_ERROR,
      };
    }
  }
}
