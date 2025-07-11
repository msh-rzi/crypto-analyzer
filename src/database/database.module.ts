import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CoinGeckoRawDataService } from './services/raw-data.service';

@Module({
  providers: [DatabaseService, CoinGeckoRawDataService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
