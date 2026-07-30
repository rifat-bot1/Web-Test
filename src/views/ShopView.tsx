import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  CheckCircle2,
  Coins,
  Sparkles,
  Zap,
  SlidersHorizontal,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import { CoinPackage } from '../types';
import { COIN_PACKAGES } from '../data/mockData';

interface ShopViewProps {
  onSelectPackage: (pkg: CoinPackage) => void;
  onOpenCalculator: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onSelectPackage, onOpenCalculator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'coins'>('popular');
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<CoinPackage | null>(null);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'standard', label: 'Standard Coins' },
    { id: 'epic_pack', label: 'Ambassador & Epic Packs' },
    { id: 'special', label: 'Mega Vaults' }
  ];

  const filteredPackages = useMemo(() => {
    return COIN_PACKAGES.filter((pkg) => {
      const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.coins.toString().includes(searchQuery) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.priceBDT - b.priceBDT;
      if (sortBy === 'price_high') return b.priceBDT - a.priceBDT;
      if (sortBy === 'coins') return b.coins - a.coins;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 py-6 pb-20">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            OFFICIAL eFOOTBALL REFILL STORE
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-white">
            COIN SHOP & SPECIAL PACKS
          </h1>
        </div>

        {/* Quick Calculator Trigger */}
        <button
          onClick={onOpenCalculator}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-950/40 transition-colors flex items-center gap-2"
        >
          <Coins className="w-4 h-4 text-amber-400" />
          <span>Calculate Custom Amount</span>
        </button>
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coins, Messi, packs..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="coins">Highest Coin Count</option>
          </select>
        </div>

      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPackages.map((pkg) => (
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
              <div
                onClick={() => setSelectedPackageForModal(pkg)}
                className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-950 cursor-pointer"
              >
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

              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-heading font-bold text-base text-white">{pkg.name}</h3>
                <button
                  onClick={() => setSelectedPackageForModal(pkg)}
                  className="text-slate-400 hover:text-cyan-400 p-1"
                  title="View Package Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

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
                Recharge
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Package Detail Modal */}
      {selectedPackageForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-3xl glass-panel border border-cyan-500/40 p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-white">
                {selectedPackageForModal.name}
              </h3>
              <button
                onClick={() => setSelectedPackageForModal(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedPackageForModal.image}
              alt={selectedPackageForModal.name}
              className="w-full h-44 object-cover rounded-2xl border border-slate-800"
            />

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPackageForModal.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Base Coins:</span>
                <span className="font-mono text-white">{selectedPackageForModal.coins}</span>
              </div>
              <div className="flex justify-between text-amber-400 font-bold">
                <span>Bonus Coins:</span>
                <span className="font-mono">+{selectedPackageForModal.bonusCoins}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                <span>Total Received:</span>
                <span className="font-mono">{selectedPackageForModal.coins + selectedPackageForModal.bonusCoins} Coins</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectPackage(selectedPackageForModal);
                setSelectedPackageForModal(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-heading font-extrabold text-xs uppercase tracking-wider"
            >
              Recharge This Pack (৳{selectedPackageForModal.priceBDT})
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
};
