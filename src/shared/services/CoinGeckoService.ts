import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CoinGeckoClient, CoinMarket, Exchange } from 'coingecko-api-v3';

interface IGetMarketData {
  vs_currency: string; // usd
}

@Injectable()
export class CoinGeckoService {
  private readonly apiKey: string;
  private readonly headers: any;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CoinGeckoApiKey')!;
    this.headers = {
      accept: 'application/json',
      'x-cg-demo-api-key': this.apiKey,
    };
  }

  async fetchData({ method, url }: { method: string; url: string }) {
    try {
      const options = {
        method,
        url,
        headers: this.headers,
      };

      const req = await axios.get(options.url, {
        headers: options.headers,
      });

      if (req.status === 200) {
        return req.data;
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMarketData({ vs_currency }: IGetMarketData): Promise<CoinMarket[]> {
    try {
      const data = await this.fetchData({
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&include_tokens=top&per_page=100&page=1`,
      });

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getExchanges(): Promise<Exchange[]> {
    try {
      const data = await this.fetchData({
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1`,
      });

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
