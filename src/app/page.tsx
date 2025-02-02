"use client";

import Chart from "./components/chart";
import Trade from "./components/trade";
import Trades from "./components/trades";
import TopBar from "./components/topBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <TopBar />
      <Chart />
      <Trade />
      <Trades />
    </main>
  );
}
