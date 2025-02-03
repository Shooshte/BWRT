import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useGetCoinPriceQuery } from "../../../lib/features/chart/coingeckoApi";
import { formatCurrency, round } from "../../../lib/utils";
import {
  addTrade,
  setBTC,
  setUSD,
} from "../../../lib/features/exchange/exchangeSlice";
import type { Trade } from "../../../lib/features/exchange/exchangeSlice";
import type { RootState } from "../../../lib/store";
import CloseIcon from "./Close.svg";
import styles from "./tradeModal.module.css";

interface TradeModalProps {
  onClose: () => void;
}

export default function TradeModal({ onClose }: TradeModalProps) {
  const [BTCAmount, setBTCAmount] = useState<string>("");
  const [USDAmount, setUSDAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dispatch = useDispatch();
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
    return coinPrice?.bitcoin.usd || 0;
  }, [coinPrice]);

  const resetTransactionState = () => {
    setError(null);
    setSuccess(null);
  };

  const handleBTCAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetTransactionState();
    const value = e.target.value.replace(/,/g, "");

    if (value.trim() === "") {
      setBTCAmount("");
      setUSDAmount("");
      return;
    }

    if (value.at(-1) === "." || (value.includes(".") && value.at(-1) === "0")) {
      setBTCAmount(value);
      return;
    }

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      // setBTCAmount(value);
      return;
    }

    const usdAmount = parsedValue * price;

    setBTCAmount(formatCurrency(parsedValue));
    setUSDAmount(formatCurrency(usdAmount));
  };

  const handleUSDAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetTransactionState();
    const value = e.target.value.replace(/,/g, "");

    if (value.trim() === "") {
      setBTCAmount("");
      setUSDAmount("");
      return;
    }

    if (value.at(-1) === "." || (value.includes(".") && value.at(-1) === "0")) {
      setUSDAmount(value);
      return;
    }

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      // setUSDAmount(value);
      return;
    }

    const btcAmount = parsedValue / price;

    setUSDAmount(formatCurrency(parsedValue));
    setBTCAmount(formatCurrency(btcAmount));
  };

  const BTCBalance = useSelector((state: RootState) => state.exchange.BTC);
  const USDBalance = useSelector((state: RootState) => state.exchange.USD);

  const updateBalance = (tradeData: Trade) => {
    if (tradeData.type === "buy") {
      dispatch(setBTC(round(BTCBalance + tradeData.amount, 8)));
      dispatch(setUSD(round(USDBalance - tradeData.amount * price, 2)));
    } else {
      dispatch(setBTC(round(BTCBalance - tradeData.amount, 8)));
      dispatch(setUSD(round(USDBalance + tradeData.amount * price, 2)));
    }
  };

  const handleBuy = () => {
    resetTransactionState();

    const parsedValue = parseFloat(`${USDAmount}`.replace(/,/g, ""));
    if (isNaN(parsedValue)) {
      setError("Invalid amount!");
      return;
    }

    if (parsedValue <= 0) {
      setError("Invalid amount!");
      return;
    }

    if (parsedValue > USDBalance) {
      setError("Insufficient funds!");
      return;
    }

    const tradeData: Trade = {
      amount: Number(BTCAmount.replace(/,/g, "")),
      id: Date.now().toString(),
      price: price,
      timestamp: Date.now(),
      type: "buy",
    };
    dispatch(addTrade(tradeData));
    updateBalance(tradeData);
    setSuccess(`Bought ${BTCAmount} BTC for ${USDAmount} USD.`);
  };

  const handleSell = () => {
    resetTransactionState();

    const parsedValue = parseFloat(`${USDAmount}`);
    if (isNaN(parsedValue)) {
      setError("Invalid amount!");
      return;
    }

    if (Number(BTCAmount) <= 0) {
      setError("Invalid amount!");
      return;
    }

    if (Number(BTCAmount) > BTCBalance) {
      setError("Insufficient funds!");
      return;
    }

    const tradeData: Trade = {
      amount: Number(BTCAmount.replace(/,/g, "")),
      id: Date.now().toString(),
      price: price,
      timestamp: Date.now(),
      type: "sell",
    };
    dispatch(addTrade(tradeData));
    updateBalance(tradeData);
    setSuccess(`Sold ${BTCAmount} BTC for ${USDAmount} USD`);
  };

  return (
    <div className={styles.overlay} data-testid="trade-modal">
      <div className={styles.controls}>
        <button className={styles.closeButton} onClick={onClose}>
          <Image src={CloseIcon} alt="Close" />
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.inputContainer}>
          <input
            id="btcAmount"
            onChange={handleBTCAmountChange}
            type="text"
            value={BTCAmount}
          />
          <label className={styles.currencyLabel} htmlFor="btcAmount">
            BTC
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input
            id="usdAmount"
            onChange={handleUSDAmountChange}
            type="text"
            value={USDAmount}
          />
          <label className={styles.currencyLabel} htmlFor="usdAmount">
            USD
          </label>
        </div>
        <div className={styles.tradeControls}>
          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
        </div>
      </div>
    </div>
  );
}
