export interface Page {
  data: CoinMarket[];
  nextPage: number;
}

export interface CoinMarket {
  /** e.g. "bitcoin" */
  id: string;
  /** lowercase symbol ("btc") */
  symbol: string;
  /** Proper name ("Bitcoin") */
  name: string;
  /** CDN url of the logo (sizes vary) */
  image: string;

  /** Latest price in the requested vs_currency */
  current_price: number;

  /** Market-cap in vs_currency */
  market_cap: number;
  /** Rank by market-cap (1 = top) */
  market_cap_rank: number;
  /** Market-cap if max_supply were in circulation */
  fully_diluted_valuation: number | null;

  /** 24-hour traded volume */
  total_volume: number;

  /** High & low in last 24 h */
  high_24h: number;
  low_24h: number;

  /** Absolute and percent change 24 h */
  price_change_24h: number;
  price_change_percentage_24h: number;

  /** Market-cap change 24 h */
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;

  /** Circulating / total / max supply */
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;

  /** All-time-high value, % from ATH and date */
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO 8601

  /** All-time-low value, % from ATL and date */
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO 8601

  /** Return on Investment (often null unless provided) */
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;

  /** ISO 8601 timestamp */
  last_updated: string;

  /** % de cambio en 7 días (solicitar con `price_change_percentage=7d`) */
  price_change_percentage_7d_in_currency?: number;
}
