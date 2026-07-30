import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

interface ContactViewProps {
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('Message Sent!', 'Our support desk received your message. We reply within 15 minutes!', 'success');
  };

  return (
    <div className="space-y-8 py-6 pb-20 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          24/7 SUPPORT CENTER
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          GET IN TOUCH WITH US
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Need help with your top-up, Player ID, or custom bulk coin orders? Our team is active 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-white">Direct Channels</h3>

            <a
              href="https://wa.me/8801700998877"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-colors"
            >
              <div className="p-3 rounded-xl bg-emerald-500 text-black font-bold">
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">24/7 WhatsApp Desk</h4>
                <p className="text-xs text-emerald-400 font-mono">+880 1700-998877</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Email Desk</h4>
                <p className="text-xs text-slate-400 font-mono">support@efootballcoinhub.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Main Office</h4>
                <p className="text-xs text-slate-400">Level 5, eSports Tower, Gulshan-2, Dhaka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-heading font-bold text-lg text-white">Message Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you {name}. An agent will reply to {email} within 15 minutes!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Rahman"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry about 5,700 Coins Package"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type message or Player ID details..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Now</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
