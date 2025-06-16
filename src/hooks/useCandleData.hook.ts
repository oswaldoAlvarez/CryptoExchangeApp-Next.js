import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCoinStore } from "@/store/coinStore";

export interface Candle {
  x: Date;
  y: [number, number, number, number];
}

export const useCandleData = (
  interval: "1h" | "4h" | "1d" | "1w" | "1M" = "1d",
  limit: number = 50
) => {
  const symbol = useCoinStore((s) => s.selected?.symbol?.toUpperCase());

  return useQuery<Candle[], Error>({
    queryKey: ["candles", symbol, interval, limit],
    enabled: Boolean(symbol),
    staleTime: 60_000,
    queryFn: async () => {
      if (!symbol) return [];

      const res = await axios.get<
        [number, string, string, string, string, ...unknown[]][]
      >("https://api.binance.com/api/v3/klines", {
        params: { symbol: symbol + "USDT", interval, limit },
      });

      return res.data.map(([ts, open, high, low, close]) => ({
        x: new Date(ts),
        y: [
          parseFloat(open),
          parseFloat(high),
          parseFloat(low),
          parseFloat(close),
        ],
      }));
    },
  });
};
