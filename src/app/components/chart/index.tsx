"use client";

import { useMemo } from "react";
import {
  useGetHistoricalDataQuery,
  usePingApiQuery,
} from "../../../lib/features/chart/coingeckoApi";

import Loader from "../loader";
import styles from "./chart.module.css";

export default function Chart() {
  const { error: pingError, isFetching: fetchingPing } = usePingApiQuery(
    undefined,
    {
      pollingInterval: 1000 * 60,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const { error: coinHistoryError, isFetching: fetchingCoinHistory } =
    useGetHistoricalDataQuery(
      { coinID: "bitcoin", days: 1, vs_currency: "usd" },
      {
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
      }
    );

  const isFetching = useMemo(
    () => fetchingCoinHistory || fetchingPing,
    [fetchingCoinHistory, fetchingPing]
  );

  const error = useMemo(
    () => !!coinHistoryError || !!pingError,
    [pingError, coinHistoryError]
  );

  return isFetching ? (
    <Loader />
  ) : error ? (
    <div className={styles.error}>Unable to load coin data.</div>
  ) : (
    <div>Chart</div>
  );
}
