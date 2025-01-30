"use client";

import React, { useMemo } from "react";
import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetHistoricalDataQuery } from "../../../lib/features/chart/coingeckoApi";

interface CoinData {
  name: string;
  EUR: number;
}

const TICK_INTERVAL = 500;

const Chart = function () {
  const { data: coinHistory } = useGetHistoricalDataQuery(
    { coinID: "bitcoin", days: 1, vs_currency: "usd" },
    {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    }
  );

  const chartData: CoinData[] = useMemo(() => {
    if (!coinHistory) return [];

    return coinHistory?.prices.map((item) => ({
      name: new Date(item[0]).toLocaleDateString(),
      EUR: Math.round(item[1]),
    }));
  }, [coinHistory]);

  const yTicks: number[] = useMemo(() => {
    if (!coinHistory) return [];

    const sortedPrices = coinHistory.prices.map((price) => price[1]).toSorted();

    const min = Math.floor(sortedPrices[0] / TICK_INTERVAL) * TICK_INTERVAL;
    const max =
      Math.ceil((sortedPrices.at(-1) || 0) / TICK_INTERVAL) * TICK_INTERVAL;

    const ticks = Array.from(
      { length: (max - min) / TICK_INTERVAL + 1 },
      (value, index) => min + index * TICK_INTERVAL
    );

    return ticks;
  }, [coinHistory]);

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c6efef" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#c6efef" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis
          axisLine={false}
          domain={["dataMin", "dataMax"]}
          interval={0}
          orientation="right"
          tick={{ fill: "#29797a" }}
          tickLine={false}
          ticks={yTicks}
          type="number"
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="EUR"
          stroke="#29797a"
          fillOpacity={1}
          fill="url(#priceColor)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default React.memo(Chart);
