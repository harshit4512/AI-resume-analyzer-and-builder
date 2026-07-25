import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Landing from "./pages/Landing";
import TemplatesPage from "./pages/TemplatesPage";
import ResumeAnalyzer from "./pages/Resumeanalyzer";
import AnalysisResult from "./pages/Analysisresult";
import { useAuthStore } from "./store/authStore";       // ✅ ADDED
import { getMe } from "./services/auth.service";  
import { useState, useEffect } from "react"; // ✅ CHANGED — added useState, useEffect
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
    const [checkingAuth, setCheckingAuth] = useState(true); // ✅ ADDED

    // ✅ ADDED — runs ONCE, on first app load, no matter which page you land on.
  // Silently asks the backend "am I still logged in?" using the httpOnly cookies.
  // If yes -> auth store is updated so Navbar/ProtectedRoute everywhere knows immediately.
  // If no  -> nothing happens, app behaves as logged out (normal).
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getMe();
        useAuthStore.setState({
          user: res.data.user,
          isAuthenticated: true,
        });
      } catch {
        // not logged in — that's fine, just proceed as guest
      } finally {
        setCheckingAuth(false);
      }
    };
    initAuth();
  }, []);
 
  // ✅ ADDED — brief loading state while we check, avoids "flash of logged-out UI"
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/landing" element={<Landing />} />

        <Route path="/" element={<Navigate to="/landing" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/builder" element={<Builder />} />

        <Route path="/templates" element={<TemplatesPage />} />

        <Route path="/resume-analyzer" element={
           <ProtectedRoute>
            <ResumeAnalyzer />
           </ProtectedRoute>
        } />

        <Route path="/analysis-result" element={
          <ProtectedRoute>
            <AnalysisResult />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
