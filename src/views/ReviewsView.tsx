import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Plus, User } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/mockData';

interface ReviewsViewProps {
  onShowToast: (title: string, message: string, type: 'success' | 'info') => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onShowToast }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCoins, setNewCoins] = useState(2130);
  const [newPlatform, setNewPlatform] = useState('Android');
  const [newComment, setNewComment] = useState('');

  const filteredReviews = ratingFilter === 0
    ? reviewsList
    : reviewsList.filter((r) => r.rating === ratingFilter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newComment.trim()) return;

    const createdRev: Review = {
      id: 'rev-' + Date.now(),
      userName: newUserName.trim(),
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      rating: newRating,
      date: 'Just now',
      coinsBought: newCoins,
      comment: newComment.trim(),
      verifiedPurchase: true,
      platform: newPlatform
    };

    setReviewsList([createdRev, ...reviewsList]);
    setShowSubmitModal(false);
    onShowToast('Review Published! ⭐', 'Thank you for rating eFootball Coin Hub!', 'success');

    // Reset
    setNewUserName('');
    setNewComment('');
  };

  return (
    <div className="space-y-8 py-6 pb-20 max-w-5xl mx-auto">
      
      {/* Header & Stats Banner */}
      <div className="rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest block mb-1">
              VERIFIED GAMER REVIEWS
            </span>
            <h1 className="font-heading font-black text-3xl text-white">
              CUSTOMER TESTIMONIALS
            </h1>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="font-heading font-black text-3xl text-amber-400">4.9 / 5.0</span>
            <div className="flex justify-center text-amber-400 text-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block">Overall Satisfaction Score</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="font-heading font-black text-3xl text-cyan-400">1,240+</span>
            <span className="text-xs font-bold text-white block">Verified Top-Up Reviews</span>
            <span className="text-[11px] text-slate-400 block">From Bangladesh & Global Gamers</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
            <span className="font-heading font-black text-3xl text-emerald-400">99.8%</span>
            <span className="text-xs font-bold text-white block">Fast Delivery Success</span>
            <span className="text-[11px] text-slate-400 block">Avg 60-Second Completion</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setRatingFilter(0)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            ratingFilter === 0 ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          All Stars
        </button>
        {[5, 4, 3].map((star) => (
          <button
            key={star}
            onClick={() => setRatingFilter(star)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              ratingFilter === star ? 'bg-cyan-500 text-black' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <span>{star} Stars</span>
            <Star className="w-3.5 h-3.5 fill-current" />
          </button>
        ))}
      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
                />
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    {rev.userName}
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      ✓ Verified Purchase
                    </span>
                  </h4>
                  <span className="text-xs text-slate-400">{rev.platform} • {rev.coinsBought} Coins</span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Modal to Submit New Review */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="font-heading font-extrabold text-xl text-white">Write Customer Review</h3>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Gamer Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Sajjad Hossain"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Coins Purchased</label>
                  <input
                    type="number"
                    value={newCoins}
                    onChange={(e) => setNewCoins(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Review Comment</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share how fast your coins arrived..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-black font-heading font-extrabold text-xs uppercase"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
