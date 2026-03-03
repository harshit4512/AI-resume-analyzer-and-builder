import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Landing from "./pages/Landing";
import TemplatesPage from "./pages/TemplatesPage";

function App() {
  return (
   
      <Routes>
        <Route path="/landing" element={<Landing/>} />
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates" element={<TemplatesPage />} />
      
      </Routes>
    
  );
}

export default App;
