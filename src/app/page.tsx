"use client";

import Chart from "./components/chart";
import Trade from "./components/trade";
import Trades from "./components/trades";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <Chart />
      <Trade />
      <Trades />
    </main>
  );
}
