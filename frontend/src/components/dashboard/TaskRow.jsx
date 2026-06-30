import React from "react";
import { CheckCircle, Clock, Trash2 } from "lucide-react";

export default function TaskRow({
  title,
  priority,
  due,
  progress,
  badgeColor,
  completed,
  onComplete,
  onDelete,
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors">
      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4
            className={`font-bold text-sm ${
              completed ? "line-through text-[#94a3b8]" : "text-[#0f172a]"
            }`}
          >
            {title}
          </h4>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {priority}
          </span>

          <span className="text-xs font-medium text-[#64748b] flex items-center gap-1 ml-auto sm:ml-2">
            <Clock className="w-3 h-3" /> {due}
          </span>
        </div>

        <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#2563eb] h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
       
        <button
  type="button"
  onClick={onComplete}
  className="relative z-20 p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer"
  title="Mark complete"
>
  <CheckCircle className="w-4 h-4 pointer-events-none" />
</button>

<button
  type="button"
  onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  onDelete?.();
}}
  className="relative z-20 p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
  title="Delete task"
>
  <Trash2 className="w-4 h-4 pointer-events-none" />
</button>
      </div>
    </div>
  );
}