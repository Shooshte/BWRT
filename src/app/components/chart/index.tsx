"use client";

import { usePingApiQuery } from "../../../lib/features/chart/coingeckoApi";

import Loader from "../loader";
import styles from "./chart.module.css";

export default function Chart() {
  const { isLoading, error } = usePingApiQuery(undefined, {
    pollingInterval: 1000 * 60,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div className={styles.error}>Unable to load coin data.</div>
  ) : (
    <div>Chart</div>
  );
}
