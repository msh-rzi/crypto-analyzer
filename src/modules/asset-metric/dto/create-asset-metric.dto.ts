import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAssetMetricDto {
  @IsInt()
  assetId: number;
  @IsInt()
  exchangeId: number;
  @IsOptional()
  @IsInt()
  tradingPairId?: number;
  @IsOptional()
  @IsInt()
  robotId?: number;
  @IsDateString()
  timestamp: Date;
  @IsString()
  price: string;
  @IsOptional()
  @IsString()
  priceChange24h?: string;
  @IsString()
  volume24h: string;
  @IsOptional()
  @IsString()
  marketCap?: string;
  @IsOptional()
  @IsString()
  priceChangePercentage1h?: string;
  @IsOptional()
  @IsString()
  priceChangePercentage24h?: string;
  @IsOptional()
  @IsString()
  priceChangePercentage7d?: string;
  @IsOptional()
  @IsInt()
  marketCapRank?: number;
  @IsOptional()
  @IsString()
  high24h?: string;
  @IsOptional()
  @IsString()
  low24h?: string;
  @IsOptional()
  @IsString()
  circulatingSupply?: string;
  @IsOptional()
  @IsString()
  totalSupply?: string;
  @IsOptional()
  @IsString()
  bidPrice?: string;
  @IsOptional()
  @IsString()
  askPrice?: string;
  @IsOptional()
  @IsString()
  spread?: string;
  @IsOptional()
  @IsString()
  quoteVolume24h?: string;
  @IsOptional()
  @IsInt()
  tradeCount24h?: number;
}
