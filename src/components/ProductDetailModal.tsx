import React from 'react';
import { Product } from '../types.ts';
import { X, ShieldCheck, Scale, Check, HelpCircle, MessageSquare, AlertTriangle, ExternalLink } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onAskAboutProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onToggleCompare,
  isCompared,
  onAskAboutProduct,
  onRequestQuote,
}) => {
  if (!product) return null;

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {product.stockStatus} ({product.stockQuantity} units available)
            </span>
          </div>
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Title & Price */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {product.name}
            </h2>
            <div className="flex flex-wrap items-baseline gap-3 mt-2">
              <span className="text-3xl font-extrabold text-slate-950">
                {product.formattedPrice}
              </span>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {product.powerRating}
              </span>
              {product.energyRating && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {product.energyRating}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Catalogue URL: <code className="text-amber-700 font-mono">{product.productUrl}</code>
            </p>
          </div>

          {/* Best For highlight */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Why this matches & who it is best for:
            </h4>
            <p className="text-sm text-amber-950 leading-relaxed font-medium">
              {product.bestFor}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Key Features & Specifications
            </h3>
            <ul className="space-y-1.5">
              {product.keyFeatures.map((feat, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Verified Technical Details
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <tbody className="divide-y divide-slate-100 bg-white">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50/70">
                      <td className="px-4 py-2.5 font-semibold text-slate-600 w-1/3 bg-slate-50/50">
                        {key}
                      </td>
                      <td className="px-4 py-2.5 text-slate-800 font-medium">{val}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-slate-600 bg-slate-50/50">
                      Official Warranty
                    </td>
                    <td className="px-4 py-2.5 text-slate-800 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{product.warranty}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Electrical Safety Advisory */}
          {product.safetyAdvisory && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900 mb-0.5">
                  electrobolt.electro Professional Safety Advisory
                </strong>
                <p>{product.safetyAdvisory}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="modal-toggle-compare-btn"
              onClick={() => onToggleCompare(product)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg border transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
              }`}
            >
              {isCompared ? <Check className="w-4 h-4 text-amber-700" /> : <Scale className="w-4 h-4" />}
              <span>{isCompared ? 'In Comparison' : 'Add to Compare'}</span>
            </button>

            <button
              id="modal-ask-advisor-btn"
              onClick={() => {
                onAskAboutProduct(product);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 py-2 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Ask Advisor About This</span>
            </button>
          </div>

          <button
            id="modal-request-quote-btn"
            onClick={() => {
              onRequestQuote(product);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 py-2 px-4 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Quotation / Callback</span>
          </button>
        </div>
      </div>
    </div>
  );
};
