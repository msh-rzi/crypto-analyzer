import { IsOptional, IsString } from 'class-validator';

export class CreateTradingPairDto {
  @IsString()
  exchangeId: string;

  @IsString()
  baseAssetId: string;

  @IsString()
  quoteAssetId: string;

  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  minTradeAmount: string;

  @IsOptional()
  @IsString()
  maxTradeAmount: string;

  @IsOptional()
  @IsString()
  tickSize: string;

  @IsOptional()
  @IsString()
  stepSize: string;
}
