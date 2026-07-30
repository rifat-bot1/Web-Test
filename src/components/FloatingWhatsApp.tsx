import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801700998877?text=Hello%20eFootball%20Hub%20Support!%20I%20need%20help%20with%20eFootball%20Coin%20Top-Up."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      title="Contact WhatsApp 24/7 Live Support"
      aria-label="WhatsApp Support"
    >
      <i className="fa-brands fa-whatsapp text-2xl animate-bounce"></i>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">
        WhatsApp Support
      </span>
    </a>
  );
};
