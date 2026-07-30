import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Download, Search, Zap, Clock, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  onShowToast
}) => {
  useEffect(() => {
    if (order) {
      // Fire celebratory confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#FFD700', '#0066FF', '#10B981']
        });
      } catch (err) {
        // Fallback if canvas confetti isn't supported
      }
    }
  }, [order]);

  if (!order) return null;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    onShowToast('Copied!', `Order ID #${order.id} copied to clipboard.`, 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative my-8 w-full max-w-xl rounded-3xl glass-panel border border-emerald-500/40 p-6 sm:p-8 shadow-2xl"
        >
          {/* Header Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="text-center space-y-3 mb-6">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-1">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Payment Received & Processing!
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your eFootball top-up order has been submitted to our automated server queue for instant delivery.
            </p>
          </div>

          {/* Receipt Details Card */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <span className="text-slate-400">Order Reference ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-cyan-300 text-sm">#{order.id}</span>
                <button
                  onClick={copyOrderId}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Copy Order ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-1">
              <div>
                <span className="text-slate-500 block text-[11px]">Player User ID:</span>
                <span className="font-mono font-semibold text-white">{order.playerId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Platform / Region:</span>
                <span className="font-semibold text-white">{order.platform} ({order.region})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Coin Package:</span>
                <span className="font-semibold text-amber-300">{order.packageName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Total Paid:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">৳{order.totalPriceBDT} BDT</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Payment Method:</span>
                <span className="font-semibold text-white uppercase">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">TrxID:</span>
                <span className="font-mono text-cyan-300">{order.transactionId}</span>
              </div>
            </div>

            {/* Realtime Live Tracker Progress */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Live Delivery Progress
              </span>
              <div className="relative flex items-center justify-between text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Order Received
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  Verifying TrxID
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  Coin Injection
                </div>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 h-full w-2/3 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                Estimated Completion: 60 - 120 Seconds
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onTrackOrder(order.id);
                onClose();
              }}
              className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Track Live Order Status</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              Done & Return Home
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
