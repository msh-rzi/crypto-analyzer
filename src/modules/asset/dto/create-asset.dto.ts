import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  coinGeckoId: string;

  @IsOptional()
  @IsString()
  coinMarketCapId: string;

  @IsOptional()
  @IsString()
  marketCap: string;

  @IsOptional()
  @IsInt()
  marketCapRank: number;
}
