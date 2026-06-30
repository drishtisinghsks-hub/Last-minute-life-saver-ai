import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getTasksRealtime } from "../../services/taskServices";

export default function Notifications() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = getTasksRealtime(user.uid, setTasks);
    return () => unsubscribe();
  }, [user]);

  const alerts = useMemo(() => {
    return tasks
      .filter((task) => !task.completed)
      .map((task) => ({
        id: task.id,
        title: task.priority === "High" ? "High priority task" : "Task reminder",
        message: `${task.title} is pending${task.dueDate ? ` and due on ${task.dueDate}` : ""}.`,
        type: task.priority === "High" ? "urgent" : "normal",
      }));
  }, [tasks]);

  const requestPermission = async () => {
  if (!("Notification" in window)) {
    alert("Browser notifications are not supported here.");
    return;
  }

  const result = await Notification.requestPermission();
  setPermission(result);

  alert("Notification permission: " + result);

  if (result === "granted") {
    new Notification("Life Saver Notifications Enabled 🔔", {
      body: "You will now receive task reminders.",
    });
  }
};

  const sendTestNotification = () => {
    if (permission !== "granted") {
      alert("Please allow notifications first.");
      return;
    }

    new Notification("Panic Mode Reminder 🚨", {
      body: alerts[0]?.message || "You have no urgent pending tasks right now.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-[#0f172a]">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link to="/dashboard" className="text-sm font-bold text-[#2563eb]">
          ← Back to Dashboard
        </Link>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2563eb] text-white p-3 rounded-2xl">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Notifications</h1>
              <p className="text-sm text-[#64748b] font-medium">
                Smart alerts for pending and urgent tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <Bell className="w-5 h-5 text-blue-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">PERMISSION</p>
            <h2 className="text-2xl font-black capitalize">{permission}</h2>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <AlertTriangle className="w-5 h-5 text-red-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">ACTIVE ALERTS</p>
            <h2 className="text-2xl font-black">{alerts.length}</h2>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <CheckCircle2 className="w-5 h-5 text-green-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">STATUS</p>
            <h2 className="text-2xl font-black">
              {alerts.length ? "Needs Focus" : "All Clear"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={requestPermission}
            className="flex-1 bg-[#2563eb] text-white rounded-2xl py-4 font-black hover:bg-blue-700 transition"
          >
            Enable Browser Notifications
          </button>

          <button
            onClick={sendTestNotification}
            className="flex-1 bg-white border border-[#e2e8f0] text-[#0f172a] rounded-2xl py-4 font-black hover:bg-slate-50 transition"
          >
            Send Test Notification
          </button>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6">
          <h2 className="text-xl font-black mb-4">Notification Center</h2>

          {alerts.length === 0 ? (
            <div className="text-sm text-[#64748b] bg-[#f8fafc] rounded-2xl p-5">
              No pending task alerts. You are clear for now.
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 bg-[#f8fafc] rounded-2xl p-4 border border-[#e2e8f0]"
                >
                  <div
                    className={`p-2 rounded-xl ${
                      alert.type === "urgent"
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {alert.type === "urgent" ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm">{alert.title}</h3>
                    <p className="text-xs text-[#64748b] mt-1">
                      {alert.message}
                    </p>
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