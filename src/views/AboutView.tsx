import React from 'react';
import { ShieldCheck, Zap, Coins, Award, Users, Server, Globe } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 py-6 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          ESTABLISHED 2023
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          ABOUT eFOOTBALL COIN HUB
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          The South Asia leader in official digital gaming currency and eFootball™ account top-up services.
        </p>
      </div>

      {/* Core Mission */}
      <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-4">
        <h2 className="font-heading font-extrabold text-2xl text-white">OUR MISSION</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          eFootball Coin Hub was founded to give competitive eFootball players in South Asia access to safe, affordable, and instant coin refills without needing international credit cards. Our automated server direct refill integration connects directly with regional KONAMI partner distribution APIs, ensuring that 98% of orders are fulfilled in 60 seconds or less.
        </p>
      </div>

      {/* Key Milestones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <Users className="w-6 h-6 text-cyan-400 mx-auto" />
          <span className="font-heading font-black text-2xl text-white block">150,000+</span>
          <span className="text-xs text-slate-400">Active eFootball Gamers</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <Coins className="w-6 h-6 text-amber-400 mx-auto" />
          <span className="font-heading font-black text-2xl text-white block">50M+</span>
          <span className="text-xs text-slate-400">Coins Refilled Safely</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <Zap className="w-6 h-6 text-emerald-400 mx-auto" />
          <span className="font-heading font-black text-2xl text-white block font-mono">60 SEC</span>
          <span className="text-xs text-slate-400">Average Processing Time</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-indigo-400 mx-auto" />
          <span className="font-heading font-black text-2xl text-white block">100%</span>
          <span className="text-xs text-slate-400">Ban-Free Guarantee</span>
        </div>
      </div>

    </div>
  );
};
