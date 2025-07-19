import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateExchangeDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

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
