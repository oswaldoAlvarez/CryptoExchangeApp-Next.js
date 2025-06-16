"use client";

import React from "react";
import { useGetData } from "@/hooks";
import { CoinMarket, Page } from "../../../../types/coin-types";
import { CryptoRow } from "./components/cryptoRow/CryptoRow.component";

export const CryptoList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetData();

  const coins = data?.pages.flatMap((page: Page) => page.data) ?? [];

  const handleNextPage = () => fetchNextPage();

  return (
    <>
      <ul>
        {coins.map((coin: CoinMarket, index: number) => (
          <CryptoRow key={index} coin={coin} />
        ))}
      </ul>
      {hasNextPage && (
        <button
          onClick={handleNextPage}
          disabled={isFetching}
          className="mt-8 ml-12 rounded-lg border-2 border-blue-600 bg-transparent px-4 py-2 text-blue-600 font-medium transition-colors duration-200 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </>
  );
};
