import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../lib/store";

import styles from "./balance.module.css";

interface Props {
  className?: string;
}

export default function Balance({ className }: Props) {
  const BTC = useSelector((state: RootState) => state.exchange.BTC);
  const USD = useSelector((state: RootState) => state.exchange.USD);

  return (
    <div className={`${styles.container} ${className}`}>
      <p>Available</p>
      <p>
        {BTC} <b>BTC</b>
      </p>
      <p>
        {USD} <b>&#36;</b>
      </p>
    </div>
  );
}
