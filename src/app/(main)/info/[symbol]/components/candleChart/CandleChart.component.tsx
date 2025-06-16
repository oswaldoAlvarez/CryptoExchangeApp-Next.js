"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import type { ApexOptions } from "apexcharts";
import { useCandleData } from "@/hooks";

const intervals = ["1h", "4h", "1d", "1w", "1M"] as const;
type Interval = (typeof intervals)[number];

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const CandleChart = () => {
  const [mounted, setMounted] = useState(false);
  const [interval, setInterval] = useState<Interval>("1d");

  const { resolvedTheme } = useTheme();
  const { data, isLoading } = useCandleData(interval, 50);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const textColor = resolvedTheme === "dark" ? "#e5e7eb" : "#374151";

  const options: ApexOptions = {
    chart: {
      type: "candlestick",
      toolbar: { show: false },
      foreColor: textColor,
      background: "transparent",
    },
    title: {
      text: `Velas ${interval}`,
      align: "left",
      style: { color: textColor },
    },
    theme: { mode: resolvedTheme as "light" | "dark" },
    xaxis: { type: "datetime", labels: { style: { colors: textColor } } },
    yaxis: { labels: { style: { colors: textColor } } },
    tooltip: { enabled: true, theme: resolvedTheme },
    responsive: [{ breakpoint: 768, options: { chart: { height: 250 } } }],
  };

  const series = data ? [{ data }] : [];

  return (
    <div className="w-full lg:mt-0 mt-8">
      {isLoading ? (
        <p className="text-center py-8">Cargando gráfico…</p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {intervals.map((intv) => (
              <button
                key={intv}
                onClick={() => setInterval(intv)}
                className={`
                  px-3 py-1 rounded text-sm border
                  ${interval === intv ? "border-blue-600" : "border-gray-300"}
                  transition
                `}
              >
                {intv}
              </button>
            ))}
          </div>
          <div className="w-full h-100">
            <ApexChart
              options={options}
              series={series}
              type="candlestick"
              width="100%"
              height="100%"
            />
          </div>
        </>
      )}
    </div>
  );
};
