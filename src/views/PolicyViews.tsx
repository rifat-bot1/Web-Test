import React, { useState } from 'react';
import { Shield, FileText, RefreshCw } from 'lucide-react';

interface PolicyViewsProps {
  initialTab?: 'privacy' | 'refund' | 'terms';
}

export const PolicyViews: React.FC<PolicyViewsProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'refund' | 'terms'>(initialTab);

  return (
    <div className="space-y-8 py-6 pb-20 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          LEGAL & COMPLIANCE
        </span>
        <h1 className="font-heading font-black text-3xl text-white">
          POLICIES & GUARANTEES
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'privacy' ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('refund')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'refund' ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400'
          }`}
        >
          100% Refund Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'terms' ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400'
          }`}
        >
          Terms of Service
        </button>
      </div>

      {/* Content Panel */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
        {activeTab === 'privacy' && (
          <>
            <h2 className="font-heading font-extrabold text-xl text-white">PRIVACY POLICY</h2>
            <p>
              eFootball Coin Hub respects gamer privacy. When placing an order, we collect your eFootball 9-digit User ID, platform preference, and payment mobile number solely for order fulfillment and transaction verification.
            </p>
            <p>
              We NEVER request or store password credentials for standard User ID top-ups. All financial transaction metadata is processed using encryptedSSL connection standards.
            </p>
          </>
        )}

        {activeTab === 'refund' && (
          <>
            <h2 className="font-heading font-extrabold text-xl text-white">100% REFUND GUARANTEE</h2>
            <p>
              If an order fails to deliver due to KONAMI server maintenance, incorrect ID verification, or server outages on our side, you are entitled to a 100% instant full refund.
            </p>
            <p>
              Refunds are issued directly to your bKash, Nagad, or bank account within 1 hour of request through our 24/7 WhatsApp customer support desk.
            </p>
          </>
        )}

        {activeTab === 'terms' && (
          <>
            <h2 className="font-heading font-extrabold text-xl text-white">TERMS OF SERVICE</h2>
            <p>
              By using eFootball Coin Hub, you agree to provide an accurate 9-digit User ID. Orders placed with incorrect User IDs belong to the submitted ID owner once fulfilled.
            </p>
            <p>
              eFootball™ is a registered trademark of Konami Digital Entertainment. eFootball Coin Hub operates as an authorized regional digital reseller.
            </p>
          </>
        )}
      </div>

    </div>
  );
};
