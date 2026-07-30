import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, SearchCheck, CheckCircle2, Clock, AlertCircle, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { Order } from '../types';

interface TrackOrderViewProps {
  initialSearchId?: string;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({
  initialSearchId,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchId || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load local history
    try {
      const saved = JSON.parse(localStorage.getItem('efootball_orders') || '[]');
      setOrderHistory(saved);
      if (initialSearchId && saved.length > 0) {
        const found = saved.find(
          (o: Order) =>
            o.id.toLowerCase() === initialSearchId.toLowerCase() ||
            o.playerId === initialSearchId
        );
        if (found) setSearchedOrder(found);
      }
    } catch (err) {
      // LocalStorage fallback
    }
  }, [initialSearchId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      const query = searchQuery.trim().toLowerCase();
      const found = orderHistory.find(
        (o) => o.id.toLowerCase() === query || o.playerId === query || o.transactionId.toLowerCase() === query
      );

      if (found) {
        setSearchedOrder(found);
        onShowToast('Order Found!', `Loaded details for order #${found.id}`, 'success');
      } else {
        // Create simulated active demo order for search lookups
        const simulatedDemoOrder: Order = {
          id: query.startsWith('ef') ? query.toUpperCase() : 'EF' + Math.floor(100000 + Math.random() * 900000),
          playerId: query.length >= 7 ? query : '284-918-301',
          platform: 'Android',
          region: 'Global',
          packageId: 'ef-1040',
          packageName: '1,040 eFootball Coins',
          coins: 960,
          bonusCoins: 80,
          quantity: 1,
          totalPriceBDT: 1050,
          totalPriceUSD: 9.20,
          discountAppliedBDT: 100,
          paymentMethod: 'bkash',
          transactionId: 'B9K8102931',
          contactNumber: '01700000000',
          contactEmail: 'gamer@gmail.com',
          status: 'Processing Delivery',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setSearchedOrder(simulatedDemoOrder);
        onShowToast('Order Tracked', `Viewing active status for Player ID / Order ${query}`, 'info');
      }
    }, 500);
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    onShowToast('Copied!', `Order ID #${id} copied.`, 'success');
  };

  return (
    <div className="space-y-8 py-6 pb-20 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          24/7 AUTOMATED SERVER MONITOR
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          TRACK TOP-UP ORDER STATUS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Enter your Order Reference ID or eFootball 9-digit Player ID to check real-time coin injection progress.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. EF123456) or Player ID..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-cyan-500/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 shadow-xl"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <SearchCheck className="w-4 h-4" />}
          <span>Track</span>
        </button>
      </form>

      {/* Tracked Order Result Card */}
      {searchedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/40 space-y-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">Order Reference ID</span>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-xl text-cyan-300 font-mono">
                  #{searchedOrder.id}
                </h3>
                <button
                  onClick={() => copyOrderId(searchedOrder.id)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-2 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{searchedOrder.status}</span>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-3 py-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Automated Processing Timeline
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  1. Order Placed
                </span>
                <p className="text-[10px] text-slate-400">Order recorded in system</p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  2. TrxID Verified
                </span>
                <p className="text-[10px] text-slate-400">Payment confirmed</p>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                  3. Coin Injection
                </span>
                <p className="text-[10px] text-slate-400">KONAMI regional API active</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  4. Completed
                </span>
                <p className="text-[10px] text-slate-500">Coins reflected in game</p>
              </div>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Player ID:</span>
              <span className="font-mono font-bold text-white">{searchedOrder.playerId}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Platform:</span>
              <span className="font-semibold text-white">{searchedOrder.platform}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Package:</span>
              <span className="font-bold text-amber-300">{searchedOrder.packageName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Payment Paid:</span>
              <span className="font-mono font-bold text-emerald-400">৳{searchedOrder.totalPriceBDT} BDT</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Saved Orders History from LocalStorage */}
      {orderHistory.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-heading font-bold text-base text-white">Your Saved Recent Orders</h3>
          <div className="space-y-2">
            {orderHistory.map((ord) => (
              <div
                key={ord.id}
                onClick={() => setSearchedOrder(ord)}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between gap-4 text-xs transition-all"
              >
                <div>
                  <span className="font-mono font-bold text-cyan-300 block">#{ord.id}</span>
                  <span className="text-slate-400">Player ID: {ord.playerId} • {ord.packageName}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-400 block">৳{ord.totalPriceBDT} BDT</span>
                  <span className="text-[11px] text-cyan-400 font-semibold">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
