import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateRobotDto {
  @IsInt()
  userId: number;

  @IsInt()
  telegramId: number;

  @IsString()
  name: string;

  @IsString()
  strategy: string;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  config: Record<string, any>;
}
