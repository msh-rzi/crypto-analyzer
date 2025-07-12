import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateRobotDto {
  @IsString()
  userId: string;

  @IsString()
  telegramId: string;

  @IsString()
  name: string;

  @IsString()
  strategy: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  config: Record<string, any>;
}
