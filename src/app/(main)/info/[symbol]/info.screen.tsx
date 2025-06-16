"use client";

import React from "react";
import { useCoinStore } from "@/store/coinStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CoinMarket } from "@/types/coin-types";
import { BackButton } from "./components/backButton.component";
import { Text } from "@/components";
import { useFormatChangePercent } from "@/hooks";
import { formatLargeNumber, formatWithThousands } from "@/utils";

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
    <main className="p-8 max-w-2xl mx-auto">
      <BackButton />
      <div className="flex items-center mb-6">
        <Image
          src={coin.image}
          alt={`Logo de ${coin.name}`}
          width={SIZE}
          height={SIZE}
          className="object-contain"
        />
        <div>
          <Text tag="h1" className="text-3xl font-bold">
            {coin.name}
          </Text>
          <Text tag="p" className="text-sm text-gray-500 uppercase">
            {coin.symbol}
          </Text>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="font-medium">Precio actual</dt>
        <dd>${formatWithThousands(coin.current_price)}</dd>

        <dt className="font-medium">Market Cap</dt>
        <dd>${formatLargeNumber(coin.market_cap)}</dd>

        <dt className="font-medium">Volumen 24h</dt>
        <dd>${formatLargeNumber(coin.total_volume)}</dd>

        <dt className="font-medium">Cambio 24h</dt>
        <dd className={className}>{text}</dd>

        <dt className="font-medium">Suministro Circulante</dt>
        <dd>{formatLargeNumber(coin.circulating_supply)}</dd>

        <dt className="font-medium">Máximo Suministro</dt>
        <dd>{coin.max_supply ? formatLargeNumber(coin.max_supply) : "N/A"}</dd>
      </dl>
    </main>
  );
}
