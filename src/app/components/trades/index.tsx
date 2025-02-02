"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import { round } from "../../../lib/utils";

import styles from "./trades.module.css";

interface ParsedTrade {
  id: string;
  time: string;
  type: string;
  value: string;
}

export default function Trades() {
  const trades = useSelector((state: RootState) => state.exchange.trades);

  const parsedTrades: ParsedTrade[] = useMemo(() => {
    return trades.map(({ amount, id, price, timestamp, type }) => {
      const roundedAmount = round(amount, 5);
      const roundedPrice = round(price * amount, 2);

      const value =
        type === "buy"
          ? `${roundedAmount} BTC / - ${roundedPrice} USD`
          : `- ${roundedAmount} BTC / + ${roundedPrice} USD`;
      const time = new Date(timestamp).toLocaleTimeString();
      return {
        id,
        time,
        type,
        value,
      };
    });
  }, [trades]);

  return (
    <ul className={styles.list}>
      {parsedTrades.map(({ id, time, type, value }) => {
        return (
          <li className={styles.listItem} key={id}>
            <div>{type}</div>
            <div className={styles.value}>{value}</div>
            <div>{time}</div>
          </li>
        );
      })}
    </ul>
  );
}
