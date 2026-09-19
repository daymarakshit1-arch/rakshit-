import React from 'react';

interface QuickOptionsBarProps {
  onSelectOption: (label: string, promptText: string) => void;
  disabled?: boolean;
}

export const QUICK_OPTIONS = [
  {
    id: 'opt-lighting',
    label: '💡 Lighting',
    prompt: 'I am looking for lighting solutions. Can you recommend suitable LED tubelights, bulbs, or decorative lighting for my home?'
  },
  {
    id: 'opt-ceiling-fans',
    label: '🌀 Ceiling Fans',
    prompt: 'I need a ceiling fan. Can you help me find the best model based on my room size, energy savings, and budget?'
  },
  {
    id: 'opt-ac',
    label: '❄️ AC & Cooling',
    prompt: 'I am looking for an Air Conditioner. What options do you have for my room size and power saving requirements?'
  },
  {
    id: 'opt-tv',
    label: '📺 Television',
    prompt: 'I am looking for a Television. What screen size and Smart TV features are available in electrobolt.electro?'
  },
  {
    id: 'opt-washing-machine',
    label: '🧺 Washing Machine',
    prompt: 'I need a washing machine for my family. Can you help me choose between front load, top load, and semi-automatic?'
  },
  {
    id: 'opt-wires',
    label: '🔌 Wires & Electrical',
    prompt: 'I need electrical wires and cables for household wiring and appliances. Which FR-LSH wire gauges do you recommend?'
  },
  {
    id: 'opt-other',
    label: '🏠 Other Appliances',
    prompt: 'What other home electrical appliances do you offer, such as water geysers, air purifiers, or induction cooktops?'
  },
  {
    id: 'opt-help-choose',
    label: '🔎 Help Me Choose',
    prompt: 'Can you guide me step-by-step to choose the right electrical product for my requirement and budget?'
  }
];

export const QuickOptionsBar: React.FC<QuickOptionsBarProps> = ({ onSelectOption, disabled }) => {
  return (
    <div className="w-full overflow-x-auto py-2.5 px-4 sm:px-6 scrollbar-none border-b border-slate-100 bg-slate-50/70">
      <div className="flex items-center gap-2 max-w-7xl mx-auto min-w-max">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
          Quick Options:
        </span>
        {QUICK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            id={opt.id}
            onClick={() => onSelectOption(opt.label, opt.prompt)}
            disabled={disabled}
            className="inline-flex items-center text-xs font-medium text-slate-700 bg-white hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-slate-200 px-3 py-1.5 rounded-full transition-all shadow-2xs whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
