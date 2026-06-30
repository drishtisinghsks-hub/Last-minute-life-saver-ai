import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path based on your structure

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!currentUser && !loading) {
    return <Navigate to="/" replace />;
  }

  return children;
}