import React, { useEffect, useState } from "react";
import { AlertTriangle, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getTasksRealtime } from "../../services/taskServices";

export default function PanicMode() {
    const { user } = useAuth();
const [tasks, setTasks] = useState([]);
const [panicPlan, setPanicPlan] = useState([]);
useEffect(() => {
  if (!user?.uid) return;

  const unsubscribe = getTasksRealtime(user.uid, setTasks);

  return () => unsubscribe();
}, [user]);
const activatePanicMode = () => {
  const pendingTasks = tasks.filter((task) => !task.completed);

  const sortedTasks = [...pendingTasks].sort((a, b) => {
    const priorityScore = { High: 3, Medium: 2, Low: 1 };
    return (priorityScore[b.priority] || 0) - (priorityScore[a.priority] || 0);
  });

  const plan = sortedTasks.map((task, index) => ({
    step: index + 1,
    text: `${task.title} - ${task.priority} priority. Work on this first for 25 minutes.`,
  }));

  setPanicPlan(
    plan.length
      ? plan
      : [{ step: 1, text: "No pending tasks. You are safe for now 🎉" }]
  );
};
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-[#0f172a]">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/dashboard" className="text-sm font-bold text-[#2563eb]">
          ← Back to Dashboard
        </Link>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 text-white p-3 rounded-2xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Panic Mode</h1>
              <p className="text-sm text-red-700 font-medium">
                Emergency task rescue plan for last-minute chaos.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <Clock className="w-5 h-5 text-red-600 mb-3" />
            <p className="text-xs font-bold text-slate-500">TIME LEFT</p>
            <h2 className="text-2xl font-black">3 Hours</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <CheckCircle2 className="w-5 h-5 text-green-600 mb-3" />
            <p className="text-xs font-bold text-slate-500">TASKS TO RESCUE</p>
            <h2 className="text-2xl font-black">Auto Detect</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <Sparkles className="w-5 h-5 text-blue-600 mb-3" />
            <p className="text-xs font-bold text-slate-500">AI PLAN</p>
            <h2 className="text-2xl font-black">Smart Order</h2>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black mb-4">Emergency Plan</h2>

          <div className="space-y-3">
            {(panicPlan.length
  ? panicPlan
  : [
      { step: 1, text: "Click Activate Panic Mode to generate your rescue plan." },
    ]
).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50"
              >
                <span className="bg-[#2563eb] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </span>
                <p className="text-sm font-semibold">{item. text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
  onClick={activatePanicMode}
  className="w-full bg-red-600 text-white rounded-2xl py-4 font-black hover:bg-red-700 transition"
>
  Activate Panic Mode 🚨
</button>
      </div>
    </div>
  );
}