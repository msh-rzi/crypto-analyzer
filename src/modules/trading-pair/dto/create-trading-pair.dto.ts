import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTradingPairDto {
  @IsInt()
  exchangeId: number;

  @IsInt()
  baseAssetId: number;

  @IsInt()
  quoteAssetId: number;

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
