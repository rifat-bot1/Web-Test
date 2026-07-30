import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Coins,
  Search,
  Calculator,
  SearchCheck,
  HelpCircle,
  Newspaper,
  Star,
  Info,
  Menu,
  X,
  Zap,
  ShoppingBag,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCalculator: () => void;
  onSelectPackageFromSearch?: (packageId: string) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenCalculator,
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Gamepad2 },
    { id: 'shop', label: 'Coin Shop', icon: Coins },
    { id: 'topup', label: 'Instant Recharge', icon: Zap, highlight: true },
    { id: 'track', label: 'Track Order', icon: SearchCheck },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'blog', label: 'Blog & News', icon: Newspaper },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060913]/85 border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-amber-400 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
              <div className="w-full h-full bg-[#0a0f24] rounded-[10px] flex items-center justify-center">
                <Coins className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                  eFOOTBALL
                </span>
                <span className="font-heading font-bold text-xs px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-500 text-black">
                  HUB
                </span>
              </div>
              <p className="text-[10px] text-cyan-400 font-tech tracking-widest uppercase">
                Instant Coin Recharge Store
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                      : link.highlight
                      ? 'text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : link.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Calculator, Top-Up CTA, Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Coin Calculator Trigger */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/50 transition-all"
              title="Open Coin Calculator"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Calculator</span>
            </button>

            {/* Instant Top-Up CTA Button */}
            <button
              onClick={() => handleNavClick('topup')}
              className="relative group overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-heading text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
              <span>Top-Up Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-800 bg-[#080c1e]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => {
                    onOpenCalculator();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-cyan-300"
                >
                  <Calculator className="w-4 h-4 text-cyan-400" />
                  <span>Coin Calculator</span>
                </button>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
                <span>⚡ 24/7 Automated Top-Up Service</span>
                <span className="text-emerald-400 font-mono">System Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
