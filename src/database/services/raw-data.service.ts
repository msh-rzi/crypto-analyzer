import { Injectable, Logger } from '@nestjs/common';
import { BinanceTickers } from 'database/raw-data/binance_tickers';
import { BitcoinMarketChart } from 'database/raw-data/bitcoin_market_chart';
import { BitcoinTickers } from 'database/raw-data/bitcoin_tickers';
import { BybitTickers } from 'database/raw-data/bybit_tickers';
import { Exchanges } from 'database/raw-data/exchanges';
import { MarketData } from 'database/raw-data/market_data';
import { RippleMarketChart } from 'database/raw-data/ripple_market_chart';
import { RippleTickers } from 'database/raw-data/ripple_tickers';
import { writeLocalFile } from 'shared/utils/write-local-file';

@Injectable()
export class CoinGeckoRawDataService {
  logger = new Logger();

  getRawMarketData() {
    this.logger.log('Read assets successfully');
    return MarketData;
  }

  addRawMarketData(asset: Unpacked<typeof MarketData>) {
    try {
      const rawAssetData: typeof MarketData = this.getRawMarketData();

      rawAssetData.push(asset);

      this.updateRawMarketData(rawAssetData);

      return true;
    } catch (error) {
      this.logger.error('Can not add asset' + error);
      return false;
    }
  }

  updateRawMarketData(data: typeof MarketData) {
    writeLocalFile(
      './src/database/raw-data/market_data.json',
      `{ "marketData" : ${JSON.stringify(data)} }`,
    );
    this.logger.log('Market data updated successfully');
  }

  getRawBinanceTickers() {
    return BinanceTickers;
  }

  getRawBitcoinMarketChart() {
    return BitcoinMarketChart;
  }

  getRawBitcoinTickers() {
    return BitcoinTickers;
  }

  getRawBybitTickers() {
    return BybitTickers;
  }

  getRawExchanges() {
    return Exchanges;
  }

  getRawRippleMarketChart() {
    return RippleMarketChart;
  }

  getRawRippleTickers() {
    return RippleTickers;
  }
}
