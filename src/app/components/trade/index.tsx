"use client";

import React, { useCallback, useState } from "react";
import { useGetCoinPriceQuery } from "../../../lib/features/chart/coingeckoApi";
import TradeModal from "./tradeModal";
import styles from "./trade.module.css";

export default function Trade() {
  const [isTrading, setIsTrading] = useState(false);

  const { error, isLoading } = useGetCoinPriceQuery(
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

  const openModal = useCallback(() => {
    setIsTrading(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsTrading(false);
  }, []);

  return (
    <>
      {error || isLoading ? null : (
        <button className={styles.button} onClick={openModal}>
          Trade
        </button>
      )}
      {isTrading && <TradeModal onClose={closeModal} />}
    </>
  );
}
