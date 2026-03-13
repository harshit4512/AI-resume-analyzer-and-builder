import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Landing from "./pages/Landing";
import TemplatesPage from "./pages/TemplatesPage";
import ResumeAnalyzer from "./pages/Resumeanalyzer";
import AnalysisResult from "./pages/Analysisresult";


import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
 
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
