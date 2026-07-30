import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Coins,
  TrendingUp,
  Star,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
  SearchCheck,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { CoinPackage, Review } from '../types';
import { COIN_PACKAGES, RECENT_TOP_UPS, REVIEWS } from '../data/mockData';

interface HomeViewProps {
  onSelectPackage: (pkg: CoinPackage) => void;
  onNavigate: (view: string) => void;
  onOpenCalculator: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectPackage,
  onNavigate,
  onOpenCalculator
}) => {
  // Flash Sale Countdown Timer (Hours : Minutes : Seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredPackages = COIN_PACKAGES.filter((p) => p.popular || p.bestValue).slice(0, 4);

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Official Regional eFootball Refill Gateway</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              INSTANT <span className="cyan-blue-gradient-text text-glow-cyan">eFOOTBALL COINS</span> & AMBASSADOR PACKS
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Recharge eFootball™ 2026 Coins instantly via <span className="text-pink-400 font-bold">bKash</span>, <span className="text-amber-400 font-bold">Nagad</span>, Rocket & Cards. 100% safe regional KONAMI ID delivery in 60 seconds!
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="font-heading font-extrabold text-lg text-cyan-400 block font-mono">60 SEC</span>
                <span className="text-[11px] text-slate-400">Avg Delivery Speed</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="font-heading font-extrabold text-lg text-amber-400 block font-mono">100%</span>
                <span className="text-[11px] text-slate-400">Account Ban Safe</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="font-heading font-extrabold text-lg text-emerald-400 block font-mono">150K+</span>
                <span className="text-[11px] text-slate-400">Satisfied Gamers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('topup')}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
                <span>Instant Top-Up Now</span>
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white font-heading font-bold text-sm hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <span>Browse All Coin Packs</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-cyan-500/40 p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-black font-heading font-black text-[10px] uppercase tracking-wider">
                FEATURED
              </div>

              {/* Card Image */}
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-5">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
                  alt="eFootball Coins Hero"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-heading font-black text-2xl text-white tracking-wider">
                    2,130 COINS
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/90 text-white font-bold text-xs">
                    +230 BONUS
                  </span>
                </div>
              </div>

              {/* Price & Quick Buy */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through block">৳2,500 BDT</span>
                  <span className="font-heading font-black text-2xl text-cyan-300 font-mono">
                    ৳2,100 <span className="text-xs font-sans text-slate-400">BDT</span>
                  </span>
                </div>

                <button
                  onClick={() => onSelectPackage(COIN_PACKAGES[4])}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg shadow-amber-400/20"
                >
                  <span>Recharge</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Flash Sale Banner with Ticking Timer */}
      <section className="relative rounded-2xl bg-gradient-to-r from-amber-500/20 via-blue-900/40 to-cyan-500/20 border border-amber-500/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
            <Flame className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg text-white">LIMITED TIME FLASH SALE</span>
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px]">UP TO 20% OFF</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Get extra bonus coins on all Thursday Epic Box recharge bundles!</p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2 font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center min-w-[56px]">
            <span className="font-heading font-black text-xl text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 block uppercase">HOURS</span>
          </div>
          <span className="text-amber-400 font-bold text-xl">:</span>
          <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center min-w-[56px]">
            <span className="font-heading font-black text-xl text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 block uppercase">MINS</span>
          </div>
          <span className="text-amber-400 font-bold text-xl">:</span>
          <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center min-w-[56px]">
            <span className="font-heading font-black text-xl text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 block uppercase">SECS</span>
          </div>
        </div>
      </section>

      {/* Live Recent Top-Up Ticker Stream */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE RECENT RECHARGES
          </span>
          <span className="text-slate-500">Updated Real-Time</span>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex gap-4 min-w-max">
            {RECENT_TOP_UPS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs min-w-[220px]"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-white block">{item.name}</span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    {item.coins.toLocaleString()} Coins ({item.method})
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 ml-auto">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coin Packages Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              MOST POPULAR SELECTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              BESTSELLING COIN PACKS
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl glass-card p-5 border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between group"
            >
              {pkg.badge && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-400 text-black font-heading font-black text-[10px] uppercase tracking-wider z-10 shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d21] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 font-heading font-black text-xl text-white">
                    {pkg.coins.toLocaleString()} COINS
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-white mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">{pkg.description}</p>

                <ul className="space-y-1.5 mb-6 text-[11px] text-slate-300">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 line-through block">৳{pkg.originalPriceBDT} BDT</span>
                  <span className="font-heading font-bold text-lg text-cyan-300 font-mono">৳{pkg.priceBDT} BDT</span>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Features Section */}
      <section className="rounded-3xl glass-panel p-8 sm:p-12 border border-cyan-500/20 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-tech font-bold text-amber-400 uppercase tracking-widest">
            THE eFOOTBALL HUB ADVANTAGE
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            WHY OVER 150,000 GAMERS TRUST US
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We provide official, zero-risk eFootball coin recharges backed by instant processing and dedicated 24/7 human support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">60-Second Auto Inject</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our automated server integration processes your User ID immediately upon transaction verification. No waiting required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">100% Account Safety</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We refill exclusively via KONAMI authorized partner top-up protocols using your 9-digit User ID. Zero password risk.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">Best Value & Extra Bonus</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enjoy up to 20% discount compared to in-game store pricing plus extra free bonus coins on all bulk bundles.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-tech font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              REAL USER FEEDBACK
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              WHAT GAMERS ARE SAYING
            </h2>
          </div>

          <button
            onClick={() => onNavigate('reviews')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>See All 1,200+ Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl glass-card border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/40"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{rev.userName}</h4>
                    <span className="text-[10px] text-slate-400">{rev.platform} Player</span>
                  </div>
                </div>

                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">"{rev.comment}"</p>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-semibold">✓ Verified Top-Up ({rev.coinsBought} Coins)</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
