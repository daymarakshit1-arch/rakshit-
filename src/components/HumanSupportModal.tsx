import React, { useState } from 'react';
import { Product } from '../types.ts';
import { X, Phone, Mail, Clock, Building, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HumanSupportModalProps {
  onClose: () => void;
  prefilledProduct?: Product | null;
}

export const HumanSupportModal: React.FC<HumanSupportModalProps> = ({
  onClose,
  prefilledProduct,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [requestType, setRequestType] = useState<'quotation' | 'callback' | 'bulk_order' | 'sales_assistance'>('quotation');
  const [requirement, setRequirement] = useState(
    prefilledProduct ? `Quotation enquiry for ${prefilledProduct.name} (${prefilledProduct.formattedPrice})` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !requirement.trim()) {
      setErrorMessage('Please fill in your name, contact information, and requirement.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          productRequirement: requirement.trim(),
          type: requestType,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try calling our toll-free line.');
      }
    } catch (err) {
      setErrorMessage('Network error submitting your enquiry. Please use our direct telephone helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="human-support-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">
              electrobolt.electro Customer & Business Support
            </h2>
          </div>
          <button
            id="close-support-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Direct Verified Contact Channels */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Official electrobolt.electro Communication Desks
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>Toll-Free Helpline</span>
                </div>
                <p className="text-slate-900 font-bold text-sm">1800-209-BOLT</p>
                <p className="text-slate-500 text-[11px] mt-0.5">(1800-209-2658)</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 text-slate-700 font-bold mb-1">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Official Support Email</span>
                </div>
                <p className="text-slate-900 font-medium text-xs break-all">support@electrobolt.electro</p>
                <p className="text-slate-500 text-[11px] mt-0.5">B2B: corporate@electrobolt.electro</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Helpline Hours: Monday to Saturday, 9:00 AM to 8:00 PM IST</span>
            </div>
          </div>

          {/* Lead / Callback Form */}
          {submitted ? (
            <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-emerald-900">Enquiry Successfully Logged!</h3>
              <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. An electrobolt.electro technical specialist will review your request and get in touch at <strong>{contact}</strong> shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 text-xs font-semibold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Return to Advisor Chat
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-600" />
                  <span>Request Official Quotation, Callback, or Bulk Pricing</span>
                </h3>
                <p className="text-xs text-slate-500">
                  We request minimal information solely to prepare your technical product quote or arrange an authorized callback.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Request Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Enquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'quotation', label: 'Quotation' },
                    { id: 'callback', label: 'Callback' },
                    { id: 'bulk_order', label: 'Bulk / B2B' },
                    { id: 'sales_assistance', label: 'Sales Help' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setRequestType(t.id as any)}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        requestType === t.id
                          ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name input */}
              <div>
                <label htmlFor="lead-name-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="lead-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Contact input */}
              <div>
                <label htmlFor="lead-contact-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Information (Mobile Number or Email) *
                </label>
                <input
                  id="lead-contact-input"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. +91 98765 43210 or email@domain.com"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Product Requirement */}
              <div>
                <label htmlFor="lead-requirement-input" className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Requirement Details *
                </label>
                <textarea
                  id="lead-requirement-input"
                  required
                  rows={3}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Describe your requirement, quantity, room sizes, or electrical project specifications..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                ></textarea>
              </div>

              {/* Privacy assurance */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero spam guarantee. Used strictly by electrobolt.electro sales engineers for this request.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-600 hover:text-slate-800 px-3 py-2 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="submit-lead-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 py-2 px-4 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
