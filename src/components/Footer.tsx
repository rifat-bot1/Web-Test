import React from 'react';
import { Coins, ShieldCheck, Zap, Headphones, Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onShowToast }) => {
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Subscribed!', 'You will now receive exclusive eFootball coin discount codes & event alerts.', 'success');
  };

  return (
    <footer className="relative z-10 bg-[#04060d] border-t border-cyan-500/15 text-slate-400">
      {/* Top Value Props Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">60-Sec Delivery</h4>
              <p className="text-xs text-slate-400">Automated instant coin refill</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">100% Account Safe</h4>
              <p className="text-xs text-slate-400">KONAMI regional API refill</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Cheapest Rates</h4>
              <p className="text-xs text-slate-400">Up to 20% extra bonus coins</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">24/7 Live Support</h4>
              <p className="text-xs text-slate-400">Instant WhatsApp & Live Chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 p-[2px]">
              <div className="w-full h-full bg-[#0a0f24] rounded-[10px] flex items-center justify-center">
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="font-heading font-extrabold text-xl text-white tracking-wider">
              eFOOTBALL<span className="text-amber-400">HUB</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 pr-4">
            The premier trusted eFootball Coins & Ambassador Pack top-up platform in South Asia. Instant 60-second automated delivery, regional discounts, and zero ban risk.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
              <i className="fa-brands fa-facebook-f text-sm"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors">
              <i className="fa-brands fa-youtube text-sm"></i>
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors">
              <i className="fa-brands fa-discord text-sm"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors">
              <i className="fa-brands fa-telegram text-sm"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => setActiveView('home')} className="hover:text-cyan-400 transition-colors">Home Store</button></li>
            <li><button onClick={() => setActiveView('shop')} className="hover:text-cyan-400 transition-colors">Coin Shop</button></li>
            <li><button onClick={() => setActiveView('topup')} className="hover:text-cyan-400 transition-colors">Instant Recharge</button></li>
            <li><button onClick={() => setActiveView('track')} className="hover:text-cyan-400 transition-colors">Track Order Status</button></li>
            <li><button onClick={() => setActiveView('reviews')} className="hover:text-cyan-400 transition-colors">Customer Reviews</button></li>
            <li><button onClick={() => setActiveView('blog')} className="hover:text-cyan-400 transition-colors">Game Guides & News</button></li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4">Support & Policies</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => setActiveView('faq')} className="hover:text-cyan-400 transition-colors">FAQ & Help Center</button></li>
            <li><button onClick={() => setActiveView('about')} className="hover:text-cyan-400 transition-colors">About eFootball Hub</button></li>
            <li><button onClick={() => setActiveView('contact')} className="hover:text-cyan-400 transition-colors">Contact Support</button></li>
            <li><button onClick={() => setActiveView('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => setActiveView('refund')} className="hover:text-cyan-400 transition-colors">Refund Guarantee</button></li>
            <li><button onClick={() => setActiveView('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-2">Discount VIP Club</h4>
          <p className="text-xs text-slate-400 mb-4">Subscribe to receive exclusive 15% promo codes for Epic Thursday drops.</p>

          <form onSubmit={handleNewsletter} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter email address..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-xs transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Payment Badges */}
          <div className="mt-6">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Supported Payment Gateways</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-pink-950/60 border border-pink-500/30 text-pink-300 font-bold">bKash</span>
              <span className="px-2.5 py-1 rounded-md bg-orange-950/60 border border-orange-500/30 text-orange-300 font-bold">Nagad</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300 font-bold">Rocket</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30 text-blue-300 font-bold">VISA</span>
              <span className="px-2.5 py-1 rounded-md bg-red-950/60 border border-red-500/30 text-red-300 font-bold">MasterCard</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#020408] py-6 border-t border-slate-800/60 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 eFootball Coin Hub. All rights reserved. Registered eSports Refill Gateway.</p>
          <p className="text-slate-600">Disclaimer: eFootball™ is a registered trademark of Konami Digital Entertainment. This site is an authorized regional reseller.</p>
        </div>
      </div>
    </footer>
  );
};
