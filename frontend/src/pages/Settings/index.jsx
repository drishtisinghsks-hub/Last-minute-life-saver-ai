import React from "react";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon, User, Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 text-[#0f172a]">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/dashboard" className="text-sm font-bold text-[#2563eb]">
          ← Back to Dashboard
        </Link>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2563eb] text-white p-3 rounded-2xl">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Settings</h1>
              <p className="text-sm text-[#64748b] font-medium">
                Manage profile, reminders, and account preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <User className="w-5 h-5 text-blue-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">USER</p>
            <h2 className="text-lg font-black">
              {user?.displayName || "Guest User"}
            </h2>
            <p className="text-xs text-[#64748b] mt-1">{user?.email}</p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <Bell className="w-5 h-5 text-amber-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">REMINDERS</p>
            <h2 className="text-lg font-black">Enabled</h2>
            <p className="text-xs text-[#64748b] mt-1">
              Browser notification support active.
            </p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <ShieldCheck className="w-5 h-5 text-green-600 mb-3" />
            <p className="text-xs font-bold text-[#64748b]">SECURITY</p>
            <h2 className="text-lg font-black">Google Auth</h2>
            <p className="text-xs text-[#64748b] mt-1">
              Secure Firebase Authentication.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 space-y-4">
          <h2 className="text-xl font-black">App Preferences</h2>

          <div className="flex items-center justify-between bg-[#f8fafc] p-4 rounded-2xl">
            <div>
              <h3 className="font-bold text-sm">Panic Mode</h3>
              <p className="text-xs text-[#64748b]">
                Auto-generate rescue plans for urgent tasks.
              </p>
            </div>
            <span className="text-xs font-bold bg-red-50 text-red-600 px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#f8fafc] p-4 rounded-2xl">
            <div>
              <h3 className="font-bold text-sm">AI Assistant</h3>
              <p className="text-xs text-[#64748b]">
                Smart task recommendations enabled.
              </p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 text-white rounded-2xl py-4 font-black hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}