"use client";

import React, { useMemo } from "react";
import { round } from "../../../lib/utils";
import {
  Area,
  Line,
  ComposedChart,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type {
  CoinPrice,
  HistoricalData,
} from "../../../lib/features/chart/coingeckoApi";

import styles from "./chart.module.css";
interface CoinData {
  name: string;
  USD: number;
}

interface ChartProps {
  coinHistory: HistoricalData | undefined;
  coinPrice: CoinPrice | undefined;
}

interface PriceLabelProps {
  label: string;
  offset: number;
  value: number;
  viewBox: { height: number; width: number; x: number; y: number };
}

const CurrentPriceLabel = ({ value, viewBox }: PriceLabelProps) => {
  return (
    <foreignObject
      style={{ overflow: "visible" }}
      x={viewBox.x + 10}
      y={viewBox.y}
    >
      <div className={styles.priceLabel}>{value}</div>
    </foreignObject>
  );
};

const PriceLabel = ({ label, value, viewBox }: PriceLabelProps) => {
  return (
    <foreignObject
      style={{ overflow: "visible" }}
      x={viewBox.x - 62}
      y={viewBox.y + 12}
    >
      <div className={styles.lastCloseLabel}>
        <p>{label}</p>
        <p>{value}</p>
      </div>
    </foreignObject>
  );
};

interface TooltipProps {
  label?: string;
  payload: {
    dataKey: string;
    value: number;
  }[];
}

const CustomTooltip = ({ label, payload }: TooltipProps) => {
  if (!label) return null;
  return (
    <div className={styles.tooltip}>
      <p>{label}</p>
      <p>{round(payload[0]?.value || 0, 0)}</p>
    </div>
  );
};

const Chart = function ({ coinHistory, coinPrice }: ChartProps) {
  const chartData: CoinData[] = useMemo(() => {
    if (!coinHistory) return [];

    const historyData = coinHistory?.prices.map((item) => ({
      name: new Date(item[0]).toLocaleTimeString(),
      USD: round(item[1], 2),
    }));

    if (coinPrice) {
      const lastHistoryTick = coinHistory?.prices.at(-1)?.[0] || 0;

      if (lastHistoryTick < coinPrice?.bitcoin.last_updated_at) {
        historyData.push({
          name: new Date(
            coinPrice?.bitcoin.last_updated_at
          ).toLocaleTimeString(),
          USD: coinPrice?.bitcoin.usd,
        });
      }
    }

    return historyData;
  }, [coinHistory, coinPrice]);

  const lastCloseData = useMemo(() => {
    if (!coinHistory) return null;
    // get previous close date
    const dayStart = new Date().setHours(0, 0, 0, 0).valueOf();
    const previousCloseDateIndex = coinHistory.prices.findLastIndex(
      (item) => item[0] < dayStart
    );
    const previousCloseTimestamp =
      coinHistory.prices[previousCloseDateIndex][0];
    const previousClosePrice = coinHistory.prices[previousCloseDateIndex][1];
    // get previous close price

    return {
      date: new Date(previousCloseTimestamp).toLocaleTimeString(),
      price: previousClosePrice,
    };
  }, [coinHistory]);

  const roundedPrice = useMemo(() => {
    return round(coinPrice?.bitcoin.usd || 0, 0);
  }, [coinPrice]);

  return (
    <ResponsiveContainer>
      <ComposedChart data={chartData} margin={{ bottom: 12 }}>
        <defs>
          <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c6efef" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#c6efef" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="USD"
          fill="url(#priceColor)"
          fillOpacity={1}
          stroke="none"
          type="monotone"
        />
        <YAxis
          axisLine={false}
          allowDecimals={false}
          domain={["dataMin", "dataMax"]}
          orientation="right"
          scale="sequential"
          tick={{ fill: "#29797a", fontSize: "12px" }}
          tickCount={6}
          tickLine={false}
          type="number"
        ></YAxis>
        <XAxis
          dataKey="name"
          domain={["dataMin", "dataMax"]}
          hide={true}
          tickFormatter={(value: string) =>
            new Date(value).toLocaleTimeString()
          }
        />

        <Tooltip
          // @ts-expect-error tooltip props get passed automatically from the LineChart, see type definition for more info
          content={CustomTooltip}
        />
        <Line dataKey="USD" dot={false} stroke="#29797a" type="monotone" />
        {lastCloseData && (
          <ReferenceDot
            ifOverflow="visible"
            isFront={true}
            r={3}
            fill="#29797a"
            stroke="none"
            x={lastCloseData.date}
            y={lastCloseData.price}
            label={
              // @ts-expect-error label props get passed automatically from the reference dot, see type definition for more info
              <PriceLabel
                label="Prev close"
                value={round(lastCloseData.price, 0)}
              />
            }
          />
        )}
        <ReferenceDot
          ifOverflow="visible"
          isFront={true}
          r={3}
          fill="#29797a"
          stroke="none"
          x={chartData.at(-1)?.name}
          y={chartData.at(-1)?.USD}
          label={
            // @ts-expect-error label props get passed automatically from the reference dot, see type definition for more info
            <CurrentPriceLabel value={roundedPrice} />
          }
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default React.memo(Chart);
