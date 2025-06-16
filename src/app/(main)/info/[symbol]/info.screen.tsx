"use client";

import React from "react";
import { useCoinStore } from "@/store/coinStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CoinMarket } from "@/types/coin-types";
import { BackButton } from "./components/backButton/BackButton.component";
import { Text } from "@/components";
import { useFormatChangePercent } from "@/hooks";
import { formatLargeNumber, formatWithThousands } from "@/utils";
import { CandleChart } from "./components/candleChart/CandleChart.component";

const SIZE = 64;

export default function InfoScreen() {
  const coin = useCoinStore((s) => s.selected) as CoinMarket;
  const router = useRouter();

  const { text, className } = useFormatChangePercent(
    coin?.price_change_percentage_24h
  );

  if (!coin) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  return (
    <main className="p-8">
      <BackButton />
      <div className="flex items-center mb-6 mt-12">
        <Image
          src={coin.image}
          alt={`Logo de ${coin.name}`}
          width={SIZE}
          height={SIZE}
          className="object-contain"
        />
        <div className="ml-2">
          <Text tag="h1" className="text-3xl font-bold">
            {coin.name}
          </Text>
          <Text tag="p" className="text-sm text-gray-500 uppercase">
            {coin.symbol}
          </Text>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div>
          <dl className="space-y-4 text-sm">
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Precio actual</dt>
              <dd>${formatWithThousands(coin.current_price)}</dd>
            </div>
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Market Cap</dt>
              <dd>${formatLargeNumber(coin.market_cap)}</dd>
            </div>
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Volumen 24h</dt>
              <dd>${formatLargeNumber(coin.total_volume)}</dd>
            </div>
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Cambio 24h</dt>
              <dd className={className}>{text}</dd>
            </div>
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Suministro Circulante</dt>
              <dd>{formatLargeNumber(coin.circulating_supply)}</dd>
            </div>
            <div className="flex lg:flex-col justify-between">
              <dt className="font-bold">Máximo Suministro</dt>
              <dd>
                {coin.max_supply ? formatLargeNumber(coin.max_supply) : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
        <CandleChart />
      </div>
    </main>
  );
}
