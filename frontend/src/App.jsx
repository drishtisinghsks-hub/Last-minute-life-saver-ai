import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { signInWithGoogle } from "./services/authService";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import PanicMode from "./pages/PanicMode";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user) return <Navigate to="/dashboard" />;

  return (
  <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white border border-[#e2e8f0] rounded-3xl p-8 shadow-xl shadow-blue-100/50">
      <div className="flex justify-center mb-6">
        <div className="bg-[#2563eb] text-white p-4 rounded-2xl shadow-md shadow-blue-200">
          <span className="text-3xl">✨</span>
        </div>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-black text-[#0f172a]">
          Last Minute Life Saver
        </h1>
        <p className="text-sm text-[#64748b] font-medium">
          AI-powered productivity for last-minute heroes.
        </p>
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-[#2563eb] text-white rounded-2xl py-4 font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100"
      >
        Continue with Google
      </button>

      <p className="text-xs text-[#94a3b8] text-center mt-6">
        Plan smarter. Panic less. Finish faster.
      </p>
    </div>
  </div>
);
}



function Protected({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
  path="/panic"
  element={
    <Protected>
      <PanicMode />
    </Protected>
  }
/>
<Route
  path="/calendar"
  element={
    <Protected>
      <Calendar />
    </Protected>
  }
/>
<Route
  path="/notifications"
  element={
    <Protected>
      <Notifications />
    </Protected>
  }
/>
<Route
  path="/settings"
  element={
    <Protected>
      <Settings />
    </Protected>
  }
/>
    </Routes>
  );
}