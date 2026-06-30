import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MiniCalendar() {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date();

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthName = currentMonthDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDays - i,
      isCurrentMonth: false,
    });
  }

  for (let date = 1; date <= totalDays; date++) {
    days.push({
      date,
      isCurrentMonth: true,
      isSelected:
        date === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear(),
      hasIndicator: date === today.getDate(),
    });
  }

  while (days.length % 7 !== 0) {
    days.push({
      date: days.length,
      isCurrentMonth: false,
    });
  }

  const goToPrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#0f172a]">
          {monthName} {year}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevMonth}
            className="p-1 text-[#64748b] hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={goToNextMonth}
            className="p-1 text-[#64748b] hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <span
            key={idx}
            className="text-[10px] font-bold text-[#94a3b8] uppercase"
          >
            {day}
          </span>
        ))}

        {days.map((item, idx) => (
          <div
            key={idx}
            className="relative py-1 flex items-center justify-center"
          >
            <button
              className={`text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center transition-all relative
                ${!item.isCurrentMonth ? "text-slate-300" : "text-[#0f172a]"}
                ${
                  item.isSelected
                    ? "bg-[#2563eb] !text-white shadow-md shadow-blue-100"
                    : "hover:bg-slate-100"
                }
              `}
            >
              {item.date}
            </button>

            {item.hasIndicator && !item.isSelected && (
              <span className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}