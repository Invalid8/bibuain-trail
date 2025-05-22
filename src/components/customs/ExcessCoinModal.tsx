import { formatNumber } from "@/lib/common";
import type { CoinData } from "@/lib/data";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ExcessCoinModal = ({
  coin,
  isOpen,
  onClose,
}: {
  coin: CoinData;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [rateOption, setRateOption] = useState("market");

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }

    function enableScroll() {
      document.body.style.overflow = "auto";
    }

    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[480px] fade-up">
        <div className="flex items-center justify-between p-5">
          <h3 className="text-xl font-semibold">
            Excess Coin Details - {coin.symbol}
          </h3>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 pt-2 sm:space-y-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm block mb-2">
                Total Coin (Wallet + Vendor)
              </label>
              <input
                className="text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400 font-[400] w-full border border-gray-100 rounded-md p-3 py-2"
                type="number"
                step={0.000001}
                placeholder="0.5"
              />
            </div>
            <div>
              <label className="text-sm block sm:mb-3 mb-1">Current Rate</label>
              <div className="text-lg font-[400]">
                US ${formatNumber(coin.rateUSD)}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm block mb-2">Capital Coin</label>
            <input
              className="text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400 font-[400] w-full border border-gray-100 rounded-md p-3 py-2"
              type="number"
              step={0.000001}
              placeholder="0.3"
            />
          </div>

          <div>
            <label className="text-sm block mb-2">Excess Coin</label>
            <input
              className="text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400 font-[400] w-full border border-gray-100 rounded-md p-3 py-2"
              type="number"
              step={0.000001}
              placeholder="0.2000000"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">
              Rate Option
            </label>
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-md">
              <span className="text-sm">Market Rate</span>
              <button
                onClick={() =>
                  setRateOption(rateOption === "market" ? "limit" : "market")
                }
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  rateOption === "market" ? "bg-yellow-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    rateOption === "market"
                      ? "translate-x-4.5"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm">Limit</span>
            </div>
          </div>
        </div>

        <div className="flex p-5 justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Executing sell trade for", coin.symbol);
              onClose();
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer"
          >
            Execute Sell Trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcessCoinModal;
