import React from 'react';
import { Zap, Phone, BookOpen, Layers, ShieldCheck, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenCatalogue: () => void;
  onOpenComparison: () => void;
  onOpenSupport: () => void;
  selectedLanguage: 'en' | 'hi' | 'hinglish';
  onSelectLanguage: (lang: 'en' | 'hi' | 'hinglish') => void;
  comparisonCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCatalogue,
  onOpenComparison,
  onOpenSupport,
  selectedLanguage,
  onSelectLanguage,
  comparisonCount,
}) => {
  return (
    <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top utility alert bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Official electrobolt.electro Catalogue Grounded
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            No invented specs or phantom prices • 100% Verified Products
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Toll-Free: 1800-209-BOLT (2658)</span>
          </div>
          <span className="hidden md:inline text-slate-500">Mon-Sat 9AM-8PM</span>
        </div>
      </div>

      {/* Main Header Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-sm font-bold">
            <Zap className="w-6 h-6 text-slate-950 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                electrobolt<span className="text-amber-500">.electro</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                AI Advisor
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Intelligent Electrical & Electronics Shopping Guide
            </p>
          </div>
        </div>

        {/* Action Controls & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              id="lang-btn-en"
              onClick={() => onSelectLanguage('en')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                selectedLanguage === 'en'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English conversation"
            >
              EN
            </button>
            <button
              id="lang-btn-hi"
              onClick={() => onSelectLanguage('hi')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                selectedLanguage === 'hi'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="हिंदी में बात करें"
            >
              हिंदी
            </button>
            <button
              id="lang-btn-hinglish"
              onClick={() => onSelectLanguage('hinglish')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                selectedLanguage === 'hinglish'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Hinglish conversation"
            >
              Hinglish
            </button>
          </div>

          {/* Catalogue Drawer Button */}
          <button
            id="open-catalogue-btn"
            onClick={onOpenCatalogue}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Catalogue</span>
          </button>

          {/* Comparison Matrix Button */}
          <button
            id="open-comparison-btn"
            onClick={onOpenComparison}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg transition-colors cursor-pointer relative"
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Compare</span>
            {comparisonCount > 0 && (
              <span className="w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[10px] font-bold flex items-center justify-center">
                {comparisonCount}
              </span>
            )}
          </button>

          {/* Human Support / Quote Button */}
          <button
            id="open-support-btn"
            onClick={onOpenSupport}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-900" />
            <span>Get Quote / Support</span>
          </button>
        </div>
      </div>
    </header>
  );
};
