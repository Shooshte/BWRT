"use client";

import React, { useMemo } from "react";
import {
  useGetCoinPriceQuery,
  useGetHistoricalDataQuery,
} from "../../../lib/features/chart/coingeckoApi";

import Chart from "./chart";
import Loader from "../loader";
import TopBar from "../topBar";
import styles from "./chart.module.css";

export default function ChartContainer() {
  const {
    data: coinHistory,
    error: coinHistoryError,
    isLoading: coinHistoryLoading,
  } = useGetHistoricalDataQuery(
    { coinID: "bitcoin", days: 1, vs_currency: "usd" },
    {
      pollingInterval: 5 * 60 * 1000,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    }
  );

  const {
    data: coinPrice,
    error: coinPriceError,
    isLoading: coinPriceLoading,
  } = useGetCoinPriceQuery(
    {
      ids: "bitcoin",
      include_last_updated_at: true,
      vs_currencies: "usd",
      precision: 2,
    },
    {
      pollingInterval: 60 * 1000,
    }
  );

  const isLoading = useMemo(() => {
    return coinPriceLoading || coinHistoryLoading;
  }, [coinPriceLoading, coinHistoryLoading]);

  const error = useMemo(() => {
    return !!coinHistoryError || !!coinPriceError;
  }, [coinHistoryError, coinPriceError]);

  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.error}>Unable to load coin price.</div>
      ) : (
        <>
          <TopBar />
          <div className={styles.chartContainer}>
            <Chart coinHistory={coinHistory} coinPrice={coinPrice} />
          </div>
        </>
      )}
    </section>
  );
}
