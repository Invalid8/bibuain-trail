import { ArrowDown, ArrowUp, ChevronDown, RefreshCw } from "lucide-react";
import { coinData, type CoinData } from "./lib/data";
import { formatNumber } from "./lib/common";
import ExcessCoinModal from "./components/customs/ExcessCoinModal";
import { useState } from "react";

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (coin: CoinData) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <div className="size-full min-h-svh sm:p-8 p-4 bg-gray-50">
      <div className="space-y-5 md:px-[5%]">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="subtitle text-2xl font-semibold">Coin Balances</h2>
          <button className="flex items-center justify-center text-sm gap-1.5 border bg-white text-black rounded-sm px-3 py-2">
            <RefreshCw size={16} />
            <span>Refresh</span>
            <ChevronDown size={18} />
          </button>
        </div>
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))]">
          {coinData.map((coin, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 bg-white p-5 rounded-md border border-gray-100"
            >
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <coin.icon />
                  <span className="font-semibold">{coin.symbol}</span>
                </div>
                {coin.changeDirection === "up" && (
                  <span className="text-green-400 flex gap-1 text-sm items-center">
                    <ArrowUp size={15} />
                    {formatNumber(coin.change)}%
                  </span>
                )}
                {coin.changeDirection !== "up" && (
                  <span className="text-red-400 flex gap-1 text-sm items-center">
                    <ArrowDown size={15} />
                    {formatNumber(coin.change)}%
                  </span>
                )}
              </div>
              <div className="space-y-0.5">
                <span className="text-sm block text-gray-400">Balance</span>
                <span className="text-lg block font-semibold">
                  {coin.balance} {coin.symbol}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-sm block text-gray-400">
                  Current Rate
                </span>
                <span className="text-lg block font-[400]">
                  US ${formatNumber(coin.rateUSD)}
                </span>
              </div>
              <div className="flex gap-4 items-center justify-between">
                <p className="text-yellow-600 text-xs">
                  Excess Coin: {formatNumber(coin.excessCoin)} {coin.symbol}
                </p>
                <button
                  className="bg-yellow-500 text-white px-3 py-2 text-xs rounded cursor-pointer"
                  onClick={() => openModal(coin)}
                >
                  Exchange Coin
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!!selectedCoin && (
        <ExcessCoinModal
          coin={selectedCoin}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
