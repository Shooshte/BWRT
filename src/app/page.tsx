"use client";

import dynamic from "next/dynamic";

import Chart from "./components/chart";
import Trade from "./components/trade";
import TopBar from "./components/topBar";
import styles from "./page.module.css";

const DynamicTrades = dynamic(() => import("./components/trades"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.container}>
      <TopBar />
      <Chart />
      <Trade />
      <DynamicTrades />
    </main>
  );
}
