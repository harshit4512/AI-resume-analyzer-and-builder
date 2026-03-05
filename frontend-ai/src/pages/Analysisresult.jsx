import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ── Animated Score Ring ── */
const ScoreRing = ({ score }) => {
  const [prog, setProg] = useState(0);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const color =
    score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 75 ? "Excellent" : score >= 50 ? "Average" : "Needs Work";
    
  useEffect(() => {
    const t = setTimeout(() => setProg(score), 300);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0">
      <svg viewBox="0 0 136 136" className="w-full h-full">
        <circle cx="68" cy="68" r={r} fill="none" stroke="#f0f0f0" strokeWidth="11" />
        <circle
          cx="68" cy="68" r={r} fill="none"
          stroke={color} strokeWidth="11" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (prog / 100) * circ}
          transform="rotate(-90 68 68)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl sm:text-4xl font-extrabold leading-none" style={{ color }}>
          {score}
        </span>
        <span className="text-xs text-gray-300 mt-0.5">/100</span>
        <span className="text-xs font-bold mt-1.5 uppercase tracking-wider" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
};

/* ── Section Card ── */
const Section = ({ icon, title, items, colorClass, bgClass, dotColor, delay }) => (
  <div
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${bgClass}`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 text-base flex-1">{title}</h3>
      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${bgClass} ${colorClass}`}>
        {items.length}
      </span>
    </div>
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
            style={{ background: dotColor }}
          />
          <span className="text-sm text-gray-500 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function AnalysisResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  useEffect(() => {
    if (!result) navigate("/resume-analyzer");
  }, [result]);

  if (!result) return null;

  const { score = 0, strengths = [], weaknesses = [], suggestions = [] } = result;

  const scorePillClass =
    score >= 75
      ? "bg-green-50 text-green-700 border border-green-200"
      : score >= 50
      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
      : "bg-red-50 text-red-600 border border-red-200";

  const scoreLabel =
    score >= 75 ? "✅ ATS Friendly" : score >= 50 ? "⚠️ Needs Improvement" : "❌ Needs Work";

  const scoreMsg =
    score >= 75
      ? "Great job! Your resume is well-optimized and has a strong chance of passing ATS filters."
      : score >= 50
      ? "Your resume is average. A few targeted improvements can significantly boost your pass rate."
      : "Your resume needs significant work. Follow the suggestions below to improve compatibility.";

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-8 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/resume-analyzer")}
            className="text-xs sm:text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            ← Back
          </button>
          <span className="font-bold text-sm sm:text-base text-gray-900 tracking-tight">
            ATS Analysis Report
          </span>
        </div>
        <button
          onClick={() => navigate("/resume-analyzer")}
          className="text-xs sm:text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 sm:px-4 py-1.5 transition-colors"
        >
          <span className="hidden sm:inline">Analyze Another →</span>
          <span className="sm:hidden">+ New</span>
        </button>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-4 sm:gap-5">

        {/* Score Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ScoreRing score={score} />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <h2 className="font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
                Your ATS Score
              </h2>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full self-center ${scorePillClass}`}>
                {scoreLabel}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5">
              {scoreMsg}
            </p>
            {/* Mini stats */}
            <div className="flex items-center justify-center sm:justify-start gap-6">
              {[
                { n: strengths.length, l: "Strengths", color: "#22c55e" },
                { n: weaknesses.length, l: "Weaknesses", color: "#f59e0b" },
                { n: suggestions.length, l: "Suggestions", color: "#6366f1" },
              ].map((m) => (
                <div key={m.l} className="flex flex-col items-center sm:items-start">
                  <span className="text-2xl sm:text-3xl font-extrabold leading-none" style={{ color: m.color }}>
                    {m.n}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths + Weaknesses — 2 col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strengths.length > 0 && (
            <Section
              icon="✅" title="Strengths" items={strengths}
              colorClass="text-green-700" bgClass="bg-green-50"
              dotColor="#22c55e" delay="0.05s"
            />
          )}
          {weaknesses.length > 0 && (
            <Section
              icon="⚠️" title="Weaknesses" items={weaknesses}
              colorClass="text-yellow-700" bgClass="bg-yellow-50"
              dotColor="#f59e0b" delay="0.1s"
            />
          )}
        </div>

        {/* Suggestions — full width */}
        {suggestions.length > 0 && (
          <Section
            icon="💡" title="Suggestions to Improve" items={suggestions}
            colorClass="text-indigo-700" bgClass="bg-indigo-50"
            dotColor="#6366f1" delay="0.15s"
          />
        )}

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-lg shadow-green-200">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-base sm:text-lg">Want a better resume?</p>
              <p className="text-green-100 text-xs sm:text-sm">
                Use our Resume Builder to fix these issues and craft an ATS-optimized resume.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto bg-white text-green-700 font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:shadow-md hover:bg-green-50 transition-all whitespace-nowrap"
          >
            Open Resume Builder
          </button>
        </div>

      </div>
    </div>
  );
}