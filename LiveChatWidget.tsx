import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, CheckCircle, Shield, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Hello gamer! ⚽ Welcome to eFootball Coin Hub. How can I assist your coin recharge today?',
      timestamp: 'Just now',
      options: [
        { label: '💰 Check Coin Prices', action: 'prices' },
        { label: '🆔 Where is my Player ID?', action: 'find_id' },
        { label: '📦 How to Track Order', action: 'track' },
        { label: '⚡ Is Delivery Instant?', action: 'instant' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleOptionClick = (action: string) => {
    let userText = '';
    let botReply = '';

    if (action === 'prices') {
      userText = 'What are the current coin prices and bonus packages?';
      botReply = 'Here are our most popular packs:\n• 320 Coins = ৳330\n• 1,040 Coins = ৳1,050 (🔥 Popular)\n• 2,130 Coins = ৳2,100 (👑 Best Value)\n• 5,700 Coins = ৳5,400\n\nAll Bangladeshi mobile banking methods (bKash/Nagad/Rocket) have 0% extra fees!';
    } else if (action === 'find_id') {
      userText = 'Where do I find my eFootball User ID?';
      botReply = 'To find your 9-digit eFootball User ID:\n1. Launch eFootball on mobile/console.\n2. Tap "Extras" in the top menu.\n3. Tap "User Information" → "User Details".\n4. Copy your User ID (e.g., 123-456-789).\n\nNo password is required for top-ups!';
    } else if (action === 'track') {
      userText = 'How do I track my top-up order status?';
      botReply = 'Click on "Track Order" in the top navigation bar and enter your Order ID or 9-digit Player ID to view live real-time status steps!';
    } else if (action === 'instant') {
      userText = 'Is delivery really instant?';
      botReply = 'Yes! Our system uses KONAMI regional automated refill APIs. 98% of orders are completed within 60 to 180 seconds after payment verification!';
    }

    addMessagePair(userText, botReply);
  };

  const addMessagePair = (userText: string, botReply: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim().toLowerCase();
    setInput('');

    let botReply = "Thank you for asking! Our support representative is active. For instant order assistance, you can also click the WhatsApp button on the bottom left for 1-on-1 human chat!";

    if (query.includes('bkash') || query.includes('nagad') || query.includes('payment')) {
      botReply = "We accept bKash (01700998877), Nagad (01811223344), Rocket, Visa, MasterCard, and PayPal! All local wallet transactions have 0% charge.";
    } else if (query.includes('id') || query.includes('player id') || query.includes('konami')) {
      botReply = "Your 9-digit Player ID is found in eFootball under Extras → User Information → User Details. Simply paste it during checkout!";
    } else if (query.includes('discount') || query.includes('coupon') || query.includes('promo')) {
      botReply = "Use promo code 'EFOOTBALL2026' during checkout to get 10% OFF your order instantly!";
    }

    addMessagePair(input, botReply);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          aria-label="Toggle Live Chat Support"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#060913] rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#060913] rounded-full" />
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                    eFootball AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • 60-Sec Support
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md shadow-cyan-900/30'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] opacity-60 block mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Interactive Quick Action Buttons */}
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.action}
                          onClick={() => handleOptionClick(opt.action)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800/90 border border-cyan-500/30 hover:border-cyan-400 text-[11px] text-cyan-300 font-medium transition-all hover:bg-cyan-950/40"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about coins, bKash, ID..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
