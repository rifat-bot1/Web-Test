import React from 'react';
import { Gamepad2, ArrowLeft } from 'lucide-react';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
      <div className="inline-flex p-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
        <Gamepad2 className="w-16 h-16 animate-bounce" />
      </div>

      <h1 className="font-heading font-black text-5xl text-white">404</h1>
      <h2 className="font-heading font-bold text-xl text-slate-300">OUT OF BOUNDS! PAGE NOT FOUND</h2>
      <p className="text-xs text-slate-400">
        The route or coin pack you are looking for has been moved or does not exist on eFootball Coin Hub.
      </p>

      <button
        onClick={onReturnHome}
        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider hover:scale-105 transition-all inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home Store</span>
      </button>
    </div>
  );
};
