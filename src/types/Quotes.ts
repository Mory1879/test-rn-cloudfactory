export interface TickerData {
  id: number;
  last: string;
  lowestAsk: string;
  highestBid: string;
  percentChange: string;
  baseVolume: string;
  quoteVolume: string;
  isFrozen: string;
  high24hr: string;
  low24hr: string;
}

export interface PoloniexResponse {
  [key: string]: TickerData;
}

export interface Quote {
  last: string;
  highestBid: string;
  percentChange: string;
}
