// pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/auth.service.js";
import { useAuthStore } from "../store/authStore";
import { useResumeStore } from "../store/resumeStore";

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const Login = () => {
  const navigate  = useNavigate();
  const loginAuth = useAuthStore((s) => s.login);
  const [showPassword, setShowPwd] = useState(false);
  const [form, setForm]            = useState({ email: "", password: "" });
  const [loading, setLoading]      = useState(false);
  
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      useResumeStore.getState().clearResume();
      loginAuth(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        * { font-family: 'DM Sans', sans-serif; }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .float-anim { animation: floatY 4s ease-in-out infinite; }
        .input-field {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          width: 100%;
          font-size: 14px;
          color: #0f172a;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .input-field:focus {
          border-color: #4ade80;
          box-shadow: 0 0 0 3px rgba(74,222,128,0.15);
        }
        .input-field::placeholder { color: #94a3b8; }
      `}</style>

      {/* ── LEFT — Form Panel (fades up on mount) ── */}
      <motion.div
        className="w-full lg:w-[45%] bg-white flex flex-col justify-center px-8 md:px-14 py-12 min-h-screen"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-sm w-full mx-auto lg:mx-0">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-[#4ade80] rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <span className="text-black font-black text-base">R</span>
            </div>
            <span className="font-display text-xl font-black text-gray-900">
              Resume<span className="text-[#16a34a]">Craft</span>
            </span>
          </Link>

          <h1 className="font-display text-4xl font-black text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to manage your resumes</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input
                className="input-field"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  className="input-field pr-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowPwd(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#16a34a] transition-colors">
                  {showPassword ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all mt-2 ${
                loading
                  ? "bg-green-200 cursor-not-allowed text-green-600"
                  : "bg-[#4ade80] hover:bg-[#22c55e] text-black shadow-lg shadow-green-100 hover:-translate-y-0.5"
              }`}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </button>
          </form>

           {/* ✅ add this divider + google button */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">Continue with Google</span>
          </button>


          <p className="text-sm text-gray-400 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#16a34a] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-gray-300 hover:text-[#4ade80] transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT — Dark panel slides in from RIGHT ── */}
      <motion.div
        className="hidden lg:flex w-[55%] bg-[#0d1117] relative overflow-hidden flex-col items-center justify-center p-12"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Glow blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#4ade80] rounded-full opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#4ade80] rounded-full opacity-10 blur-3xl pointer-events-none" />

        {/* Resume mockup */}
        <div className="relative z-10 w-full max-w-xs mx-auto float-anim">
          <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="bg-[#4ade80] rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-white/30 rounded-full" />
                <div>
                  <div className="h-2.5 bg-white/70 rounded w-28 mb-1" />
                  <div className="h-2 bg-white/40 rounded w-20" />
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {["React","Node.js","MongoDB"].map(s => (
                  <span key={s} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="h-2 bg-white/20 rounded w-1/3 mb-1.5" />
                <div className="h-2 bg-white/10 rounded w-full mb-1" />
                <div className="h-2 bg-white/10 rounded w-4/5" />
              </div>
              <div>
                <div className="h-2 bg-white/20 rounded w-1/4 mb-1.5" />
                <div className="h-2 bg-white/10 rounded w-full mb-1" />
                <div className="h-2 bg-white/10 rounded w-3/4" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
              <span className="text-white/50 text-xs">Resume ready</span>
              <div className="w-7 h-7 bg-[#4ade80] rounded-lg flex items-center justify-center text-black font-bold text-xs">↓</div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -left-8 top-1/4 bg-white rounded-xl px-3 py-2 shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">Live Preview</span>
          </div>
          <div className="absolute -right-6 bottom-10 bg-[#4ade80] rounded-xl px-3 py-2 shadow-xl">
            <span className="text-black text-xs font-bold whitespace-nowrap">3 Templates ✨</span>
          </div>
          <div className="absolute -right-4 top-0 bg-[#1a1f2e] border border-white/10 rounded-xl px-3 py-2 shadow-xl">
            <span className="text-white text-xs font-semibold">📄 PDF Export</span>
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 text-center mt-12">
          <p className="font-display text-2xl font-black text-white mb-2">Your resumes, always ready.</p>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            Edit, update, download PDF and manage all your resumes in one place.
          </p>
          <div className="flex gap-8 justify-center mt-8">
            {[["10k+","Users"],["3","Templates"],["Free","Forever"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p className="font-display text-xl font-black text-[#4ade80]">{val}</p>
                <p className="text-white/40 text-xs">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
