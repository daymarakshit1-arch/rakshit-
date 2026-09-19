import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, Product } from '../types.ts';
import { ELECTROBOLT_CATALOGUE } from '../data/products.ts';
import { ProductCardItem } from './ProductCardItem.tsx';
import { Zap, User, Copy, Check, ShieldAlert } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onViewProduct: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProductIds: string[];
  onAskAboutProduct: (product: Product) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onViewProduct,
  onToggleCompare,
  comparedProductIds,
  onAskAboutProduct,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find products mentioned or recommended in this message
  const identifiedProducts = React.useMemo(() => {
    if (isUser) return [];
    return ELECTROBOLT_CATALOGUE.filter((p) => {
      // Check if product name or URL is in the text
      const inTextByName = message.text.toLowerCase().includes(p.name.toLowerCase());
      const inTextByUrl = message.text.includes(p.productUrl);
      const inTextById = message.recommendedProductIds?.includes(p.id);
      return inTextByName || inTextByUrl || inTextById;
    });
  }, [message.text, message.recommendedProductIds, isUser]);

  // Check if message discusses electrical wiring or high voltage to highlight safety
  const mentionsHighVoltage = React.useMemo(() => {
    const textLower = message.text.toLowerCase();
    return (
      textLower.includes('electrician') ||
      textLower.includes('installation') ||
      textLower.includes('wiring') ||
      textLower.includes('fr-lsh') ||
      textLower.includes('mcb')
    );
  }, [message.text]);

  return (
    <div
      id={`chat-message-${message.id}`}
      className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-1 shadow-xs">
          <Zap className="w-4 h-4 fill-slate-950" />
        </div>
      )}

      {/* Message Content Container */}
      <div
        className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
          isUser
            ? 'bg-slate-900 text-white rounded-tr-xs'
            : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
        }`}
      >
        {/* Header line for Assistant */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 text-xs text-slate-400">
            <span className="font-semibold text-amber-600 flex items-center gap-1">
              <span>electrobolt.electro AI Advisor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </span>
            <button
              onClick={handleCopy}
              className="hover:text-slate-700 transition-colors p-1 rounded-sm cursor-pointer"
              title="Copy answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Markdown Rendered Body */}
        <div className="prose prose-sm max-w-none text-slate-800 break-words leading-relaxed">
          <ReactMarkdown
            components={{
              table: ({ children }) => (
                <div className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200 text-xs text-left bg-white">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-slate-50 font-bold text-slate-700">{children}</thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-slate-100">{children}</tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-slate-50/50 transition-colors">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-slate-800 font-semibold">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-slate-600 align-top">{children}</td>
              ),
              a: ({ href, children }) => {
                // If it's a product link, allow clicking to view in modal
                const matched = ELECTROBOLT_CATALOGUE.find((p) => p.productUrl === href);
                if (matched) {
                  return (
                    <button
                      onClick={() => onViewProduct(matched)}
                      className="text-amber-600 hover:text-amber-700 font-bold underline inline-flex items-center gap-0.5 cursor-pointer ml-1"
                    >
                      {children}
                    </button>
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-600 hover:text-amber-700 font-semibold underline"
                  >
                    {children}
                  </a>
                );
              },
              p: ({ children }) => (
                <p className={`${isUser ? 'text-white' : 'text-slate-800'} my-1.5`}>{children}</p>
              ),
              strong: ({ children }) => (
                <strong className={isUser ? 'text-amber-300 font-bold' : 'text-slate-900 font-bold'}>
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-4 space-y-1 my-2 text-slate-700">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 space-y-1 my-2 text-slate-700">{children}</ol>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>

        {/* Electrical Safety Banner if relevant */}
        {!isUser && mentionsHighVoltage && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>electrobolt.electro Safety Notice:</strong> For internal home wiring, high-tonnage ACs, or water heaters, always use a certified licensed electrician.
            </span>
          </div>
        )}

        {/* Identified Product Recommendation Cards Grid */}
        {!isUser && identifiedProducts.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Verified Catalogue Matches ({identifiedProducts.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {identifiedProducts.map((prod) => (
                <ProductCardItem
                  key={prod.id}
                  product={prod}
                  onViewDetails={onViewProduct}
                  onToggleCompare={onToggleCompare}
                  isCompared={comparedProductIds.includes(prod.id)}
                  onAskAbout={onAskAboutProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1 shadow-xs">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
