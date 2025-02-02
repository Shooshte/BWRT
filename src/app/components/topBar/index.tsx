"use client";

import Image from "next/image";
import React from "react";
import Balance from "./balance";
import BisonSVG from "./Bison.svg";
import CurrencyPnL from "./currencyPnL";

import styles from "./topBar.module.css";

export default function TopBar() {
  return (
    <section className={styles.container}>
      <Image alt="Blue bison" className={styles.bison} src={BisonSVG} />
      <Balance className={styles.balance} />
      <CurrencyPnL className={styles.currencyPnL} />
    </section>
  );
}
