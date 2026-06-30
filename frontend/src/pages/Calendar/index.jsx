import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Flag } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getTasksRealtime } from "../../services/taskServices";

export default function Calendar() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = getTasksRealtime(user.uid, setTasks);
    return () => unsubscribe();
  }, [user]);

  const tasksWithDates = tasks.filter((task) => task.dueDate);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-[#0f172a]">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link to="/dashboard" className="text-sm font-bold text-[#2563eb]">
          ← Back to Dashboard
        </Link>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2563eb] text-white p-3 rounded-2xl">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Calendar</h1>
              <p className="text-sm text-[#64748b] font-medium">
                View all task deadlines in one clean timeline.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6">
          <h2 className="text-xl font-black mb-4">Upcoming Deadlines</h2>

          {tasksWithDates.length === 0 ? (
            <div className="text-sm text-[#64748b] bg-[#f8fafc] rounded-2xl p-5">
              No dated tasks yet. Add due dates from the dashboard.
            </div>
          ) : (
            <div className="space-y-3">
              {tasksWithDates.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f8fafc] rounded-2xl p-4 border border-[#e2e8f0]"
                >
                  <div>
                    <h3 className="font-bold text-sm">{task.title}</h3>
                    <p className="text-xs text-[#64748b] flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      Due: {task.dueDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : task.priority === "Medium"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Flag className="w-3 h-3 inline mr-1" />
                      {task.priority}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        task.completed
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}