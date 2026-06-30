import React from "react";

export default function AICopilotCard({ title, desc, confidence, onApply }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 space-y-3 relative hover:border-blue-200 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-bold text-xs text-[#0f172a]">{title}</h4>
        <span className="bg-blue-50 text-[#2563eb] text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide shrink-0">
          {confidence} CONFIDENCE
        </span>
      </div>

      <p className="text-xs text-[#64748b] font-medium leading-relaxed">
        {desc}
      </p>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={onApply}
          className="bg-[#2563eb] text-white text-xs font-bold py-2 px-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          Apply
        </button>

        <button className="bg-white text-[#64748b] border border-[#e2e8f0] text-xs font-bold py-2 px-3 rounded-xl hover:bg-slate-50 hover:text-[#0f172a] transition-colors">
          Dismiss
        </button>
      </div>
    </div>
  );
}