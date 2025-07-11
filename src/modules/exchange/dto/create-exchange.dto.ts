import { Type } from 'class-transformer';
import { IsJSON, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateExchangeDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  apiUrl: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  apiConfig?: Record<string, any>;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  makerFee: string;

  @IsOptional()
  @IsString()
  takerFee: string;
}
