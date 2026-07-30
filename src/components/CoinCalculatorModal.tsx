import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, Zap, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface CoinCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculatedCoinPackage: (coins: number, priceBDT: number) => void;
}

export const CoinCalculatorModal: React.FC<CoinCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculatedCoinPackage
}) => {
  const [coins, setCoins] = useState<number>(1040);

  // Price calculations
  // Rate: approx 1 coin = ~1.02 BDT base, with volume tiers
  const calculateRate = (val: number) => {
    if (val < 500) return 1.08;
    if (val < 2000) return 1.01;
    if (val < 5000) return 0.95;
    return 0.91; // Bulk discount rate
  };

  const currentRate = calculateRate(coins);
  const calculatedPriceBDT = Math.round(coins * currentRate);
  const inGamePriceBDT = Math.round(coins * 1.30); // Direct in-game rate
  const totalSavingsBDT = Math.max(0, inGamePriceBDT - calculatedPriceBDT);
  const estimatedBonusCoins = coins >= 5000 ? Math.round(coins * 0.18) : coins >= 2000 ? Math.round(coins * 0.12) : coins >= 1000 ? Math.round(coins * 0.08) : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">
                  eFootball Coin & Price Calculator
                </h3>
                <p className="text-xs text-slate-400">Instant rate breakdown & volume savings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Calculator Body */}
          <div className="py-6 space-y-6">
            
            {/* Range Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Desired Coins Amount
                </label>
                <span className="text-xs text-amber-400 font-bold font-tech flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{estimatedBonusCoins} Free Bonus Coins
                </span>
              </div>

              <div className="relative mb-4">
                <input
                  type="number"
                  min="100"
                  max="25000"
                  step="50"
                  value={coins}
                  onChange={(e) => setCoins(Math.max(100, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/50 text-2xl font-heading font-bold text-cyan-300 text-center focus:outline-none focus:border-cyan-400 shadow-inner"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  COINS
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="130"
                max="12000"
                step="50"
                value={coins}
                onChange={(e) => setCoins(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>130 (Starter)</span>
                <span>2,130 (Best Value)</span>
                <span>12,000 (Vault)</span>
              </div>
            </div>

            {/* Calculations Breakdown Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Direct In-Game Store Price:</span>
                <span className="line-through text-slate-500 font-mono">৳{inGamePriceBDT} BDT</span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>eFootball Hub Discount Price:</span>
                <span className="font-heading font-extrabold text-base text-cyan-300 font-mono">
                  ৳{calculatedPriceBDT} BDT
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-emerald-400 font-semibold">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Total Money Saved:
                </span>
                <span className="font-mono text-sm">৳{totalSavingsBDT} BDT ({Math.round((totalSavingsBDT/inGamePriceBDT)*100)}% OFF)</span>
              </div>
            </div>

            {/* Safety Guarantee */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Includes 100% automated KONAMI regional refill guarantee.</span>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                onSelectCalculatedCoinPackage(coins, calculatedPriceBDT);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-heading font-extrabold uppercase text-xs tracking-wider shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Recharge {coins + estimatedBonusCoins} Coins Now (৳{calculatedPriceBDT})</span>
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
