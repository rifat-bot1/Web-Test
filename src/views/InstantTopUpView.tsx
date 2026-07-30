import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Gamepad2,
  Globe,
  Coins,
  Ticket,
  Zap,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CoinPackage, PlatformType, RegionType } from '../types';
import { COIN_PACKAGES, COUPONS } from '../data/mockData';

interface InstantTopUpViewProps {
  initialPackage?: CoinPackage | null;
  onProceedToCheckout: (orderData: {
    playerId: string;
    platform: PlatformType;
    region: RegionType;
    packageItem: CoinPackage;
    couponCode?: string;
    discountBDT: number;
    finalPriceBDT: number;
  }) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const InstantTopUpView: React.FC<InstantTopUpViewProps> = ({
  initialPackage,
  onProceedToCheckout,
  onShowToast
}) => {
  const [playerId, setPlayerId] = useState<string>('');
  const [platform, setPlatform] = useState<PlatformType>('Android');
  const [region, setRegion] = useState<RegionType>('Global');
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage>(
    initialPackage || COIN_PACKAGES[3] // Default to 1,040 coins
  );
  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountBDT: number;
  } | null>(null);

  const platforms: PlatformType[] = ['Android', 'iOS', 'PlayStation', 'Xbox', 'PC / Steam'];
  const regions: RegionType[] = ['Global', 'Asia / Japan', 'Europe', 'Americas'];

  // Apply coupon code logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const matchedCoupon = COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
    );

    if (matchedCoupon) {
      if (selectedPackage.priceBDT < matchedCoupon.minSpendBDT) {
        onShowToast(
          'Minimum Order Requirement',
          `Coupon '${matchedCoupon.code}' requires a minimum spend of ৳${matchedCoupon.minSpendBDT} BDT.`,
          'error'
        );
        return;
      }

      const discountCalculated = Math.min(
        Math.round((selectedPackage.priceBDT * matchedCoupon.discountPercent) / 100),
        matchedCoupon.maxDiscountBDT
      );

      setAppliedCoupon({
        code: matchedCoupon.code,
        discountBDT: discountCalculated
      });

      onShowToast(
        'Coupon Applied! 🎉',
        `You saved ৳${discountCalculated} BDT with promo code ${matchedCoupon.code}!`,
        'success'
      );
    } else {
      onShowToast('Invalid Coupon', 'The promo code entered is invalid or expired. Try EFOOTBALL2026', 'error');
    }
  };

  const discountBDT = appliedCoupon ? appliedCoupon.discountBDT : 0;
  const finalPayableBDT = Math.max(0, selectedPackage.priceBDT - discountBDT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Player ID format (e.g. 9 digits numeric)
    const cleanId = playerId.trim().replace(/-/g, '');
    if (!cleanId || cleanId.length < 7 || isNaN(Number(cleanId))) {
      onShowToast(
        'Invalid Player ID',
        'Please enter a valid 9-digit eFootball User ID (e.g. 123456789).',
        'error'
      );
      return;
    }

    onProceedToCheckout({
      playerId: playerId.trim(),
      platform,
      region,
      packageItem: selectedPackage,
      couponCode: appliedCoupon?.code,
      discountBDT,
      finalPriceBDT: finalPayableBDT
    });
  };

  return (
    <div className="space-y-8 py-6 pb-20 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          DIRECT ACCOUNT INJECTION FORM
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          INSTANT eFOOTBALL RECHARGE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Enter your 9-digit Player ID, select platform & coin pack. Instant delivery in 60 seconds!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Player ID Input */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-heading font-black text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="font-heading font-bold text-base text-white">Enter eFootball Player ID</h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                9-Digit User ID <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="e.g. 123-456-789"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm font-mono font-bold text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                <span>Find ID in eFootball → Extras → User Info → User Details</span>
                <span className="text-emerald-400 font-semibold">✓ Password NOT Required</span>
              </div>
            </div>
          </div>

          {/* Step 2: Platform & Region Selection */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-heading font-black text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="font-heading font-bold text-base text-white">Select Platform & Region</h3>
            </div>

            {/* Platform Options */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Gaming Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {platforms.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      platform === p
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Region Options */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Account Server Region</label>
              <div className="grid grid-cols-2 gap-2.5">
                {regions.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`p-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      region === r
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Coin Package Selection */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-heading font-black text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="font-heading font-bold text-base text-white">Select Coin Package</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {COIN_PACKAGES.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{pkg.name}</h4>
                        <span className="text-[11px] text-cyan-400 font-mono">৳{pkg.priceBDT} BDT</span>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Order Summary & Coupon Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 p-6 rounded-3xl glass-panel border border-cyan-500/40 space-y-6 shadow-2xl">
            <h3 className="font-heading font-extrabold text-lg text-white pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>ORDER SUMMARY</span>
              <Coins className="w-5 h-5 text-amber-400" />
            </h3>

            {/* Selected Package Details */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Selected Package:</span>
                <span className="font-bold text-white">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Base Coins:</span>
                <span className="font-mono text-cyan-300">{selectedPackage.coins}</span>
              </div>
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Bonus Coins:</span>
                <span className="font-mono">+{selectedPackage.bonusCoins}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Platform:</span>
                <span className="font-semibold text-white">{platform}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Have a Discount Code?</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. EFOOTBALL2026"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300 uppercase focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-[11px] text-emerald-400 font-bold mt-1.5 block">
                  ✓ Code '{appliedCoupon.code}' Applied! Saved ৳{appliedCoupon.discountBDT} BDT.
                </span>
              )}
            </div>

            {/* Total Price Calculation */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-300">৳{selectedPackage.priceBDT} BDT</span>
              </div>
              {discountBDT > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-৳{discountBDT} BDT</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-base font-bold text-white">
                <span>Total Payable:</span>
                <span className="font-heading text-2xl text-cyan-300 font-mono">৳{finalPayableBDT} BDT</span>
              </div>
            </div>

            {/* Proceed to Payment CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-heading font-extrabold uppercase text-xs tracking-wider shadow-xl shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
              <span>Proceed to Mobile Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SSL / bKash Secured 256-Bit Encrypted</span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
