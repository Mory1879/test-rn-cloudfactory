import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { PoloniexResponse, Quote } from '../types/Quotes';

class QuotesStore {
  quotes: Record<string, Quote> = {};
  previousQuotes: Record<string, Quote> = {};
  loading = true;
  firstLoad = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchQuotes() {
    if (this.firstLoad) this.loading = true;
    try {
      const response = await fetch(
        'https://poloniex.com/public?command=returnTicker',
      );
      const data: PoloniexResponse = await response.json();

      this.previousQuotes = this.quotes;
      this.quotes = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = {
          last: value.last,
          highestBid: value.highestBid,
          percentChange: value.percentChange,
        };
        return acc;
      }, {} as Record<string, Quote>);
      this.error = null;
      this.loading = false;
      this.firstLoad = false;
      if (!this.firstLoad)
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Quotes Updated',
          visibilityTime: 1500,
          onPress: () => Toast.hide(),
        });
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      this.error = (error as Error).message;
      this.loading = false;
    }
  }
}

export default new QuotesStore();
