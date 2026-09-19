import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types.ts';
import { ELECTROBOLT_CATALOGUE, CATEGORY_LIST } from '../data/products.ts';
import { X, Search, Filter, ShieldCheck, ArrowUpRight, Scale, Check } from 'lucide-react';

interface CatalogueBrowserModalProps {
  onClose: () => void;
  onViewProduct: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProductIds: string[];
  onAskAboutProduct: (product: Product) => void;
}

export const CatalogueBrowserModal: React.FC<CatalogueBrowserModalProps> = ({
  onClose,
  onViewProduct,
  onToggleCompare,
  comparedProductIds,
  onAskAboutProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return ELECTROBOLT_CATALOGUE.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Budget filter
      if (maxBudget) {
        const budgetNum = Number(maxBudget);
        if (!isNaN(budgetNum) && p.price > budgetNum) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inFeatures = p.keyFeatures.some((f) => f.toLowerCase().includes(q));
        const inTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!inName && !inFeatures && !inTags) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, maxBudget]);

  return (
    <div
      id="catalogue-browser-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">
                Official electrobolt.electro Product Catalogue
              </h2>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {ELECTROBOLT_CATALOGUE.length} Verified Items
              </span>
            </div>
            <p className="text-xs text-slate-500">
              The AI Advisor recommends exclusively from this verified database with live inventory tracking.
            </p>
          </div>
          <button
            id="close-catalogue-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, BLDC, 4K, 1.5 sq mm, etc..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            {/* Max Budget filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span>Max Budget:</span>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="₹ Any"
                className="w-24 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm font-semibold text-slate-600">No products match your criteria</p>
              <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or budget ceiling.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm">
                        {prod.category}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
                        {prod.stockStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                      {prod.name}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-black text-slate-950 font-display">
                        {prod.formattedPrice}
                      </span>
                      <span className="text-xs text-slate-500">{prod.powerRating}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {prod.bestFor}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onViewProduct(prod);
                        onClose();
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 py-1.5 px-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Specs</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onToggleCompare(prod)}
                      className={`inline-flex items-center gap-1 text-xs py-1.5 px-2 rounded-lg border transition-colors cursor-pointer ${
                        comparedProductIds.includes(prod.id)
                          ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                      }`}
                      title={comparedProductIds.includes(prod.id) ? 'In comparison' : 'Add to compare'}
                    >
                      {comparedProductIds.includes(prod.id) ? <Check className="w-3 h-3" /> : <Scale className="w-3 h-3" />}
                    </button>

                    <button
                      onClick={() => {
                        onAskAboutProduct(prod);
                        onClose();
                      }}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 px-2 py-1.5 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
