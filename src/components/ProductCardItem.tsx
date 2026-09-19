import React from 'react';
import { Product } from '../types.ts';
import { ShieldCheck, ArrowUpRight, Scale, Check } from 'lucide-react';

interface ProductCardItemProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onAskAbout: (product: Product) => void;
}

export const ProductCardItem: React.FC<ProductCardItemProps> = ({
  product,
  onViewDetails,
  onToggleCompare,
  isCompared,
  onAskAbout,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-4 max-w-sm"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {product.stockStatus}
          </span>
        </div>

        {/* Name & Pricing */}
        <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-1">
          {product.name}
        </h4>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-black text-slate-950 font-display">
            {product.formattedPrice}
          </span>
          <span className="text-xs text-slate-500">
            {product.powerRating}
          </span>
        </div>

        {/* Feature summary */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-2 italic">
          "{product.bestFor}"
        </p>

        {/* Warranty Tag */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>{product.warranty}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <button
          id={`view-btn-${product.id}`}
          onClick={() => onViewDetails(product)}
          className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <span>View Product</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>

        <button
          id={`compare-btn-${product.id}`}
          onClick={() => onToggleCompare(product)}
          className={`inline-flex items-center justify-center gap-1 text-xs font-medium py-1.5 px-2.5 rounded-lg border transition-colors cursor-pointer ${
            isCompared
              ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
              : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
        >
          {isCompared ? <Check className="w-3 h-3 text-amber-700" /> : <Scale className="w-3 h-3" />}
          <span className="hidden sm:inline">{isCompared ? 'Added' : 'Compare'}</span>
        </button>

        <button
          id={`ask-btn-${product.id}`}
          onClick={() => onAskAbout(product)}
          className="text-xs font-medium text-amber-700 hover:text-amber-900 hover:bg-amber-50 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
          title="Ask advisor about this product"
        >
          Ask
        </button>
      </div>
    </div>
  );
};
