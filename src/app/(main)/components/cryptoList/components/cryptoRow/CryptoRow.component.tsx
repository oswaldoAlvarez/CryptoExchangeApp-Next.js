"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components";
import { useFormatChangePercent } from "@/hooks";
import { CoinMarket } from "@/types/coin-types";
import { formatLargeNumber, formatWithThousands } from "@/utils";
import { useCoinStore } from "@/store/coinStore";

const SIZE = 32;

interface ICryptoRow {
  coin: CoinMarket;
}

export const CryptoRow = ({ coin }: ICryptoRow) => {
  const set = useCoinStore((s) => s.setSelected);

  const change24h = useFormatChangePercent(coin.price_change_percentage_24h);
  const change7d = useFormatChangePercent(
    coin.price_change_percentage_7d_in_currency ?? 0
  );

  return (
    <Link
      href={`/info/${coin.symbol}`}
      key={coin.id}
      onClick={() => set(coin)}
      className="flex lg:flex-row flex-col lg:items-center mt-4 pb-4 lg:justify-between border-b border-gray-200 item"
    >
      <div className="flex-row flex items-center lg:w-[20%] lg:ml-30 lg:mb-0 mb-4">
        <Image
          src={coin.image}
          alt="coin image"
          width={SIZE}
          height={SIZE}
          className="object-contain mr-2"
          loading="eager"
          priority={true}
        />
        <div className="flex lg:flex-col">
          <Text size="sm" weight="bold">
            {coin.name}
          </Text>
          <Text size="sm" className="ml-2 lg:ml-0 text-gray-400">
            {coin.symbol.toUpperCase()}
          </Text>
        </div>
      </div>
      <div className="items-center lg:w-[20%] mb-2 flex flex-row justify-between">
        <Text size="sm" weight="bold" className="text-gray-500 block lg:hidden">
          Precio
        </Text>
        <Text size="sm" weight="bold">
          ${formatWithThousands(coin.current_price)}
        </Text>
      </div>
      <div className="items-center lg:w-[20%] mb-2 flex flex-row justify-between">
        <Text size="sm" weight="bold" className="text-gray-500 block lg:hidden">
          24h %
        </Text>
        <Text weight="bold" size="sm" className={change24h.className}>
          {change24h.text}
        </Text>
      </div>
      <div className="items-center lg:w-[20%] mb-2 flex flex-row justify-between">
        <Text size="sm" weight="bold" className="text-gray-500 block lg:hidden">
          7d %
        </Text>
        <Text weight="bold" size="sm" className={change7d.className}>
          {change7d.text}
        </Text>
      </div>
      <div className="items-center lg:w-[20%] mb-2 flex flex-row justify-between">
        <Text size="sm" weight="bold" className="text-gray-500 block lg:hidden">
          Marketcap
        </Text>
        <Text size="sm">${formatLargeNumber(coin.market_cap)}</Text>
      </div>
      <div className="items-center lg:w-[20%] mb-2 flex flex-row justify-between">
        <Text size="sm" weight="bold" className="text-gray-500 block lg:hidden">
          Vólumen
        </Text>
        <Text size="sm">${formatLargeNumber(coin.total_volume)}</Text>
      </div>
    </Link>
  );
};
