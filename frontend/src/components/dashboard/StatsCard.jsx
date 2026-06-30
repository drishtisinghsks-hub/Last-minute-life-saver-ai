import React from 'react';

export default function StatsCard({ 
  title, 
  value, 
  unit = '', 
  meta, 
  metaColor = 'text-slate-600', 
  icon: Icon, 
  iconColor = 'text-slate-600', 
  iconBg = 'bg-slate-100',
  isAgentic = false 
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex justify-between items-start relative overflow-hidden">
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase">{title}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#0f172a] tracking-tight">{value}</span>
          {unit && <span className="text-sm font-semibold text-[#64748b]">{unit}</span>}
        </div>
        <p className={`text-xs font-semibold ${metaColor}`}>{meta}</p>
      </div>
      
      <div className={`${iconBg} ${iconColor} p-2.5 rounded-xl flex items-center justify-center relative z-10`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Subtle background branding for specialized metrics like Agentic Boost */}
      {isAgentic && (
        <div className="absolute right-2 bottom-2 text-[10px] font-black italic tracking-tighter text-slate-100 select-none uppercase pointer-events-none scalar-95 opacity-60">
          Agentic Boost
        </div>
      )}
    </div>
  );
}