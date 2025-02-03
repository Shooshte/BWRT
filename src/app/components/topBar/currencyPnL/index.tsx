"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../lib/store";
import { formatCurrency, round } from "../../../../lib/utils";
import { useGetCoinPriceQuery } from "../../../../lib/features/chart/coingeckoApi";

import styles from "./currency.module.css";

interface Props {
  className?: string;
}

export default function CurrencyPnL({ className }: Props) {
  const { data: coinPrice } = useGetCoinPriceQuery(
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

  const price = useMemo(() => {
    return coinPrice?.bitcoin.usd;
  }, [coinPrice]);

  const trades = useSelector((state: RootState) => state.exchange.trades);

  const PnL = useMemo(() => {
    const difference = trades.reduce((acc, trade) => {
      if (trade.type === "buy") {
        acc -= trade.amount * trade.price;
      } else {
        acc += trade.amount * trade.price;
      }
      return acc;
    }, 0);

    return round(difference, 2);
  }, [trades]);

  const inProfit = useMemo(() => {
    return PnL >= 0;
  }, [PnL]);

  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.currencyText}>BTC</p>
      <p className={styles.currencyText}>
        {formatCurrency(price || 0)}&nbsp;&#36;
      </p>
      <p className={styles.pnlText}>
        PnL:{" "}
        <span className={`${inProfit ? styles.inProfit : styles.inLoss}`}>
          {inProfit ? `+ ${PnL}` : PnL}
        </span>
        &nbsp;&#36;
      </p>
    </div>
  );
}
