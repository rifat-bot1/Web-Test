import React, { useState } from 'react';
import { Newspaper, Clock, User, Tag, Search, ArrowRight, X } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

export const BlogView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['all', 'Packs & Epics', 'Top-Up Tips', 'Game Guide'];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 py-6 pb-20 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-800 pb-6">
        <span className="text-xs font-tech font-bold text-cyan-400 uppercase tracking-widest">
          eFOOTBALL 2026 GUIDES & NEWS
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          BLOG & STRATEGY HUB
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Learn how to spend coins wisely, guarantee Epic Booster cards, and keep your account safe.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 overflow-hidden cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-bold text-[10px] uppercase">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Modal Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative my-8 w-full max-w-2xl rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs inline-block">
              {selectedArticle.category}
            </span>

            <h2 className="font-heading font-extrabold text-2xl text-white">{selectedArticle.title}</h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-56 object-cover rounded-2xl border border-slate-800"
            />

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
