import { BTCIcon, ETHIcon, USDTIcon } from "@/components/customs/icons";

export type CoinData = {
  symbol: string;
  name: string;
  balance: number;
  rateUSD: number;
  change: number;
  changeDirection: "up" | "down";
  excessCoin: number;
  excessCoinUnit: string;
  capitalCoin: number;
  icon: () => React.ReactNode;
};

export const coinData: CoinData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: 0.45,
    rateUSD: 62500.0,
    change: 2.3,
    changeDirection: "up",
    excessCoin: 0.2,
    capitalCoin: 0.1,
    excessCoinUnit: "BTC",
    icon: BTCIcon,
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: 1250.75,
    rateUSD: 1.0,
    change: 0.01,
    changeDirection: "up",
    excessCoin: 500.0,
    capitalCoin: 0.1,
    excessCoinUnit: "USDT",
    icon: USDTIcon,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: 3.2,
    rateUSD: 3450.0,
    change: 1.2,
    changeDirection: "down",
    excessCoin: 1.5,
    capitalCoin: 0.1,
    excessCoinUnit: "ETH",
    icon: ETHIcon,
  },
];
