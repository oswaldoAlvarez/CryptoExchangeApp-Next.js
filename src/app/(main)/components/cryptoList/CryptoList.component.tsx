"use client";

import React, { useMemo } from "react";
import { useGetData, useSortableData } from "@/hooks";
import { CoinMarket, Page } from "@/types/coin-types";
import { CryptoRow } from "./components/cryptoRow/CryptoRow.component";

export const CryptoList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetData();
  const coins = useMemo(
    () => data?.pages.flatMap((p: Page) => p.data) ?? [],
    [data]
  );

  const { sortedItems, sortBy, order, requestSort } =
    useSortableData<CoinMarket>(coins);

  const headers: {
    key: keyof CoinMarket;
    label: string;
    numeric: boolean;
    width?: string;
  }[] = [
    { key: "name", label: "Nombre", numeric: false },
    { key: "current_price", label: "Precio", numeric: true },
    { key: "price_change_percentage_24h", label: "24h%", numeric: true },
    {
      key: "price_change_percentage_7d_in_currency",
      label: "7d%",
      numeric: true,
    },
    { key: "market_cap", label: "Market Cap", numeric: true },
    { key: "total_volume", label: "Volumen", numeric: true },
  ];

  return (
    <>
      <div className="lg:flex border-b font-semibold text-sm px-4 py-2 hidden pl-32">
        {headers.map(({ key, label, numeric }) => (
          <button
            key={String(key)}
            onClick={() => requestSort(key)}
            className="w-1/6 flex items-center text-left"
          >
            {label}
            {sortBy === key &&
              (() => {
                const isAscArrowUp = numeric
                  ? order === "desc"
                  : order === "asc";

                return (
                  <span className="ml-1 text-xs">
                    {isAscArrowUp ? "▲" : "▼"}
                  </span>
                );
              })()}
          </button>
        ))}
      </div>

      <ul>
        {sortedItems.map((coin) => (
          <CryptoRow key={coin.id} coin={coin} />
        ))}
      </ul>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="mt-4 ml-4 rounded-lg border-2 border-blue-600 bg-transparent px-4 py-2 text-blue-600 font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </>
  );
};
