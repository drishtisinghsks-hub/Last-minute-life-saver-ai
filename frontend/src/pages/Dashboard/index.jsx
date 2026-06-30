import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  Calendar as CalendarIcon,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Menu,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";

import AddTaskDialog from "../../components/dialogs/AddTaskDialog";
import { useAuth } from "../../context/AuthContext";
import {
  getTasksRealtime,
  updateTask,
  deleteTask,
} from "../../services/taskServices";

import StatsCard from "../../components/dashboard/StatsCard";
import TaskRow from "../../components/dashboard/TaskRow";
import AICopilotCard from "../../components/dashboard/AICopilotCard";
import ActivityItem from "../../components/dashboard/ActivityItem";
import MiniCalendar from "../../components/dashboard/MiniCalendar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { user, logout } = useAuth();

  useEffect(() => {
  console.log("Dashboard user:", user);

  if (!user?.uid) {
    console.log("No user UID found");
    return;
  }

  const unsubscribe = getTasksRealtime(user.uid, (tasksFromDB) => {
    console.log("Tasks from Firestore:", tasksFromDB);
    setTasks(tasksFromDB);
  });

  return () => unsubscribe();
}, [user]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed);

const highPriorityTasks = pendingTasks.filter(
  (task) => task.priority === "High"
);

const nextTask =
  highPriorityTasks[0] || pendingTasks[0] || null;
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e2e8f0] flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="bg-[#2563eb] text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-[#0f172a]">
                Last Minute Life Saver
              </h1>
              <p className="text-xs text-[#64748b] font-medium">
                AI Productivity
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#e2e8f0]/60 text-[#2563eb]"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>

            <a
  href="#tasks"
  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
>
  <CheckSquare className="w-5 h-5" />
  Tasks
</a>

            <Link
  to="/panic"
  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748b] hover:bg-red-50 hover:text-red-600 transition-colors"
>
  <Sparkles className="w-5 h-5" />
  Panic Mode
</Link>

            <Link
              to="/calendar"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="bg-[#2563eb] text-white p-4 rounded-2xl relative overflow-hidden shadow-xl shadow-blue-100">
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-1">Go Premium</h4>
              <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                Unlock advanced AI task prioritization
              </p>
              <button className="w-full bg-white text-[#2563eb] text-xs font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-blue-50 transition-colors">
                Upgrade to Pro
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500 rounded-full opacity-20 pointer-events-none" />
          </div>

          <div className="pt-2 border-t border-[#e2e8f0] space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              Help
            </a>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#64748b] hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0] h-16 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button
              className="lg:hidden p-2 text-[#64748b] hover:bg-slate-100 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                placeholder="Search tasks, docs, or AI insights..."
                className="w-full bg-[#f1f5f9] pl-10 pr-4 py-2 rounded-full text-xs font-medium placeholder-[#94a3b8] border border-transparent focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <Link
  to="/notifications"
  className="relative p-2 text-[#64748b] hover:bg-slate-100 rounded-full transition-colors"
>
  <Bell className="w-5 h-5" />
  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
</Link>

            <div className="flex items-center gap-3 border-l border-[#e2e8f0] pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-[#0f172a]">
                  {user?.displayName || "Drishti"}
                </p>
                <p className="text-[10px] text-[#64748b] font-medium">
                  Product Manager
                </p>
              </div>

              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#e2e8f0]"
              />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 space-y-6 flex-1 max-w-[1400px] w-full mx-auto relative">
          {/* Welcome Header */}
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight flex items-center gap-2">
              Good morning, {user?.displayName?.split(" ")[0] || "Drishti"}{" "}
              <span className="animate-bounce origin-bottom">👋</span>
            </h2>
            <p className="text-xs text-[#64748b] font-medium mt-1">
              You have{" "}
              <span className="text-[#2563eb] font-bold">
                {tasks.length} tasks
              </span>{" "}
              in your dashboard.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="TASKS TODAY"
              value={tasks.length}
              meta="Live from Firestore"
              metaColor="text-green-600"
              icon={CheckSquare}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
            />

            <StatsCard
              title="COMPLETED"
              value={completedTasks}
              meta={`${tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0}% Complete`}
              metaColor="text-slate-600"
              icon={TrendingUp}
              iconColor="text-slate-600"
              iconBg="bg-slate-100"
            />

            <StatsCard
              title="AI SAVED"
              value="40"
              unit="mins"
              meta="Agentic Boost"
              metaColor="text-amber-700"
              icon={Sparkles}
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
              isAgentic
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-tight text-[#0f172a]">
                  Focus Tasks
                </h3>

                <button className="text-xs font-bold text-[#2563eb] hover:underline">
                  View All
                </button>
              </div>
              <div id="tasks">

              {tasks.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 text-sm text-[#64748b]">
                  No tasks yet. Click the + button to add your first task.
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                
  <TaskRow
    key={task.id}
    title={task.title}
    priority={`${task.priority} Priority`}
    due={task.dueDate || "No due date"}
    completed={task.completed}
    progress={task.completed ? 100 : 20}
    badgeColor={
      task.priority === "High"
        ? "bg-red-50 text-red-600"
        : task.priority === "Medium"
        ? "bg-blue-50 text-blue-600"
        : "bg-slate-100 text-slate-600"
    }
    onComplete={async () => {

  try{
    await updateTask(user.uid, task.id, {
      completed: !task.completed,
    });
 } catch (error) {
    console.error("Complete failed:", error);
    alert("Complete failed: " + error.message);
  }
}}
    onDelete={async () => {
  alert("Delete function started");

  try {
    await deleteTask(user.uid, task.id);
    alert("Task deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);
    alert("Delete failed: " + error.message);
  }
}}
  />
))}    
                </div>
              )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2563eb]" />
                  <h3 className="font-bold text-sm tracking-tight text-[#0f172a]">
                    AI Copilot
                  </h3>
                </div>

                <div className="space-y-3">
  <AICopilotCard
    title={nextTask ? `Focus on ${nextTask.title}` : "All tasks completed"}
    desc={
      nextTask
        ? `AI suggests starting with this ${nextTask.priority} priority task to reduce deadline stress.`
        : "Great work! You have no pending tasks right now."
    }
    confidence={nextTask ? "94%" : "100%"}
    onApply={() => {
      if (nextTask) {
        alert(`AI recommends: Start "${nextTask.title}" now.`);
      } else {
        alert("No pending tasks. You are clear!");
      }
    }}
  />

  <AICopilotCard
    title="Generate Today's Plan"
    desc={`You have ${pendingTasks.length} pending tasks and ${highPriorityTasks.length} high priority tasks.`}
    confidence="89%"
    onApply={() => {
      alert(
        highPriorityTasks.length
          ? `Start with ${highPriorityTasks[0].title}, then continue with remaining tasks.`
          : "Start with your earliest pending task."
      );
    }}
  />
</div>
              </div>

              <MiniCalendar />
            </div>
          </div>

          {/* Activity Stream */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#64748b]" />
              Activity Stream
            </h3>

            <div className="divide-y divide-slate-100">
              <ActivityItem
                type="warning"
                title="Deadline approaching"
                desc="Tasks are now connected with Firestore."
                time="Just now"
              />

              <ActivityItem
                type="ai"
                title="New AI suggestion"
                desc="Use Panic Mode for urgent tasks."
                time="1 hour ago"
              />

              <ActivityItem
                type="success"
                title="Task system active"
                desc="Task creation and realtime fetching are enabled."
                time="5 minutes ago"
              />
            </div>
          </div>

          {/* Floating Add Button */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-[#2563eb] text-white p-3.5 rounded-full shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 z-40"
          >
            <Plus className="w-6 h-6" />
          </button>

          <AddTaskDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            userId={user?.uid}
          />
        </main>
      </div>
    </div>
  );
}