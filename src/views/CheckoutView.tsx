import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CreditCard,
  Copy,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  ShieldCheck,
  AlertCircle,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { CoinPackage, PaymentMethodId, PlatformType, RegionType, Order } from '../types';
import { PAYMENT_METHODS } from '../data/mockData';

interface CheckoutViewProps {
  orderData: {
    playerId: string;
    platform: PlatformType;
    region: RegionType;
    packageItem: CoinPackage;
    couponCode?: string;
    discountBDT: number;
    finalPriceBDT: number;
  };
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  orderData,
  onBack,
  onOrderSuccess,
  onShowToast
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('bkash');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');

  const currentMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    onShowToast('Copied!', `Account number ${acc} copied to clipboard.`, 'success');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactNumber.trim() || contactNumber.length < 10) {
      onShowToast('Missing Contact Number', 'Please enter a valid 11-digit mobile number for order notifications.', 'error');
      return;
    }

    if (!transactionId.trim() || transactionId.trim().length < 6) {
      onShowToast('Missing Transaction ID', 'Please enter the 8 to 10-digit Transaction ID (TrxID) from your payment SMS.', 'error');
      return;
    }

    // Generate unique Order ID
    const newOrderId = 'EF' + Math.floor(100000 + Math.random() * 900000);

    const newOrder: Order = {
      id: newOrderId,
      playerId: orderData.playerId,
      platform: orderData.platform,
      region: orderData.region,
      packageId: orderData.packageItem.id,
      packageName: orderData.packageItem.name,
      coins: orderData.packageItem.coins,
      bonusCoins: orderData.packageItem.bonusCoins,
      quantity: 1,
      totalPriceBDT: orderData.finalPriceBDT,
      totalPriceUSD: Math.round(orderData.finalPriceBDT / 115),
      discountAppliedBDT: orderData.discountBDT,
      couponCode: orderData.couponCode,
      paymentMethod: selectedMethod,
      transactionId: transactionId.trim().toUpperCase(),
      contactNumber: contactNumber.trim(),
      contactEmail: contactEmail.trim(),
      status: 'Processing Delivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save order into localStorage array
    try {
      const existingOrders = JSON.parse(localStorage.getItem('efootball_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('efootball_orders', JSON.stringify(existingOrders));
    } catch (err) {
      // Storage fallback
    }

    onOrderSuccess(newOrder);
  };

  return (
    <div className="space-y-8 py-6 pb-20 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest block">
            STEP 2 OF 2
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            PAYMENT CHECKOUT
          </h1>
        </div>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Payment Selector & Steps */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Payment Method Selector Grid */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-white">Select Payment Gateway</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    type="button"
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <i className={`${method.icon} text-2xl`} style={{ color: method.color }}></i>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <span className="font-bold text-xs text-white block truncate">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Instructions Card */}
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 space-y-4 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>{currentMethod.name} Instructions</span>
              </h3>
              {currentMethod.accountNumber && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <span className="text-amber-400 font-bold">{currentMethod.accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(currentMethod.accountNumber!)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Instruction Steps List */}
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
              {currentMethod.instructions.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Transaction Verification Inputs */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-white">Verification & Contact Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contact Mobile */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact Mobile Number <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. 01700112233"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email (Optional Receipt)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Payment Transaction ID (TrxID) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. B8A92K1L0P"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/50 text-sm font-mono font-bold text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 uppercase"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Found in the payment confirmation SMS sent by bKash / Nagad / Bank.
              </span>
            </div>
          </div>

        </div>

        {/* Right Order Review Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 p-6 rounded-3xl glass-panel border border-cyan-500/40 space-y-6 shadow-2xl">
            <h3 className="font-heading font-extrabold text-lg text-white pb-3 border-b border-slate-800">
              FINAL ORDER REVIEW
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Player User ID:</span>
                <span className="font-mono font-bold text-cyan-300">{orderData.playerId}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="font-semibold text-white">{orderData.platform} ({orderData.region})</span>
              </div>
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-bold text-amber-300">{orderData.packageItem.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Coins Received:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {orderData.packageItem.coins + orderData.packageItem.bonusCoins} Coins
                </span>
              </div>
              {orderData.discountBDT > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount Applied:</span>
                  <span className="font-mono">-৳{orderData.discountBDT} BDT</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-base font-bold text-white">
                <span>Total Amount:</span>
                <span className="font-heading text-2xl text-cyan-300 font-mono">৳{orderData.finalPriceBDT} BDT</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-heading font-extrabold uppercase text-xs tracking-wider shadow-xl shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Submit Payment & Recharge</span>
            </button>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 text-center">
              🔒 100% Guaranteed delivery or instant automated refund to sender mobile account.
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
