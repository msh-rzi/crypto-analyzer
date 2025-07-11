import { Injectable } from '@nestjs/common';
import { MarketData } from './raw-data/market_data';
import { BinanceTickers } from './raw-data/binance_tickers';
import { BitcoinMarketChart } from './raw-data/bitcoin_market_chart';
import { BitcoinTickers } from './raw-data/bitcoin_tickers';
import { BybitTickers } from './raw-data/bybit_tickers';
import { Exchanges } from './raw-data/exchanges';
import { RippleMarketChart } from './raw-data/ripple_market_chart';
import { RippleTickers } from './raw-data/ripple_tickers';

@Injectable()
export class DatabaseService {
  getRawMarketData() {
    return MarketData;
  }

  addRawMarketData(asset: Unpacked<typeof MarketData>) {
    return;
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
