import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MiniCalendar() {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Static rendering block representing standard hackathon layout constraints matching the design
  const days = [
    { date: 31, isCurrentMonth: false },
    { date: 1, isCurrentMonth: true },
    { date: 2, isCurrentMonth: true },
    { date: 3, isCurrentMonth: true },
    { date: 4, isCurrentMonth: true },
    { date: 5, isCurrentMonth: true },
    { date: 6, isCurrentMonth: true },
    { date: 7, isCurrentMonth: true },
    { date: 8, isCurrentMonth: true, isSelected: true },
    { date: 9, isCurrentMonth: true },
    { date: 10, isCurrentMonth: true, hasIndicator: true },
    { date: 11, isCurrentMonth: true },
    { date: 12, isCurrentMonth: true },
    { date: 13, isCurrentMonth: true }
  ];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 space-y-4">
      {/* Header Selector */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0f172a]">June 2026</span>
        <div className="flex items-center gap-1">
          <button className="p-1 text-[#64748b] hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 text-[#64748b] hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Matrix layout */}
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-[10px] font-bold text-[#94a3b8] uppercase">
            {day}
          </span>
        ))}

        {days.map((item, idx) => (
          <div key={idx} className="relative py-1 flex items-center justify-center">
            <button
              className={`text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center transition-all relative
                ${!item.isCurrentMonth ? 'text-slate-300' : 'text-[#0f172a]'}
                ${item.isSelected ? 'bg-[#2563eb] !text-white shadow-md shadow-blue-100' : 'hover:bg-slate-100'}
              `}
            >
              {item.date}
            </button>
            
            {/* Context Dot Notification Marker */}
            {item.hasIndicator && (
              <span className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}