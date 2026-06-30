import React from 'react';
import { AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ActivityItem({ type, title, desc, time }) {
  // Determine configurations structurally based on type mapping
  const config = {
    warning: {
      icon: AlertCircle,
      iconColor: 'text-red-600',
      bg: 'bg-red-50',
    },
    ai: {
      icon: Sparkles,
      iconColor: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    success: {
      icon: CheckCircle2,
      iconColor: 'text-green-600',
      bg: 'bg-green-50',
    },
  }[type] || { icon: AlertCircle, iconColor: 'text-slate-600', bg: 'bg-slate-50' };

  const IconComponent = config.icon;

  return (
    <div className="flex gap-4 py-4 first:pt-0 last:pb-0 group">
      {/* Icon node wrapper timeline segment */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`${config.bg} ${config.iconColor} p-2 rounded-full flex items-center justify-center`}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="w-0.5 bg-slate-100 flex-1 group-last:hidden mt-2" />
      </div>

      {/* Narrative Segment */}
      <div className="space-y-0.5 flex-1">
        <h4 className="font-bold text-xs text-[#0f172a]">{title}</h4>
        <p className="text-xs text-[#64748b] font-medium leading-relaxed">{desc}</p>
        <span className="block text-[10px] text-[#94a3b8] font-semibold pt-0.5">{time}</span>
      </div>
    </div>
  );
}