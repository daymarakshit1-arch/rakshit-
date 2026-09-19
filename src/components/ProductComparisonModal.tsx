import React from 'react';
import { Product } from '../types.ts';
import { X, Scale, Trash2, ArrowRight } from 'lucide-react';

interface ProductComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onAskComparisonInChat: () => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  products,
  onClose,
  onRemoveProduct,
  onAskComparisonInChat,
}) => {
  return (
    <div
      id="product-comparison-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">
              electrobolt.electro Product Comparison Matrix ({products.length})
            </h2>
          </div>
          <button
            id="close-comparison-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No products added for comparison</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Click "+ Compare" on any recommended product card or ask the AI Advisor to compare products directly.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-xl text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-600 uppercase tracking-wider w-40">
                      Feature
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="px-4 py-3 text-left font-bold text-slate-900 min-w-56">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-extrabold text-sm">{p.name}</span>
                          <button
                            onClick={() => onRemoveProduct(p.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded-sm cursor-pointer"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="inline-block mt-1 text-xs text-amber-700 font-bold">
                          {p.formattedPrice}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Price
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3 font-black text-slate-900 text-sm">
                        {p.formattedPrice}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Power Rating
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-slate-700 font-medium">
                        {p.powerRating}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Key Feature
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-slate-700 leading-relaxed">
                        {p.keyFeatures[0]}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Warranty
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-slate-700 font-medium">
                        {p.warranty}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Stock Status
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3">
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {p.stockStatus} ({p.stockQuantity} units)
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-700 bg-slate-50/70">
                      Best For
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-amber-950 font-medium bg-amber-50/30 leading-relaxed">
                        {p.bestFor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {products.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800 block mb-1">electrobolt.electro Objective Evaluation Principle:</strong>
              We never declare an arbitrary "best product." Each model is engineered for different room dimensions, noise thresholds, and budget expectations. Review the "Best For" column above to match your household's exact scenario.
            </div>
          )}
        </div>

        {/* Modal Actions */}
        {products.length > 0 && (
          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              You can ask the AI Advisor to analyze differences in natural conversation.
            </span>
            <button
              id="ask-ai-compare-btn"
              onClick={() => {
                onAskComparisonInChat();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 py-2 px-4 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <span>Ask Advisor to Compare in Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
