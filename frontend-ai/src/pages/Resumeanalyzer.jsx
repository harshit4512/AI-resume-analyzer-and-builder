// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {useAuthStore} from "../store/authStore.js";

// const getGreeting = () => {
//   const h = new Date().getHours();
//   if (h < 12) return { text: "Good Morning", emoji: "☀️" };
//   if (h < 17) return { text: "Good Afternoon", emoji: "🌤️" };
//   return { text: "Good Evening", emoji: "🌙" };
// };

// export default function ResumeAnalyzer() {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { text: greetText, emoji } = getGreeting();
//   const firstName = user?.name?.split(" ")[0] || "there";

//   const handleFile = (f) => {
//     if (!f) return;
//     if (f.type !== "application/pdf") { setError("Only PDF files are allowed."); return; }
//     setFile(f); setError("");
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     handleFile(e.dataTransfer.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!file) return setError("Please select a PDF file first.");
//     setLoading(true); setError("");
//     try {
//       const formData = new FormData();
//       formData.append("resume", file);
//       const res = await fetch("/api/ai/analyze", {
//         method: "POST", credentials: "include", body: formData,
//       });
//       const data = await res.json();
//       if (!res.ok) { setError(data.message || "Something went wrong."); setLoading(false); return; }
//       let parsed;
//       try {
//         const clean = data.result.replace(/```json|```/g, "").trim();
//         parsed = JSON.parse(clean);
//       } catch {
//         setError("Failed to parse AI response. Please try again.");
//         setLoading(false); return;
//       }
//       navigate("/analysis-result", { state: { result: parsed } });
//     } catch {
//       setError("Network error. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">

//       {/* ── Top Nav Bar ── */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-8 h-14 flex items-center justify-between shadow-sm">
//         <span className="font-bold text-base sm:text-lg text-gray-900 tracking-tight">
//           Resume Analyzer
//         </span>
//         <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 text-xs sm:text-sm text-green-800 font-medium">
//           <span>{emoji}</span>
//           <span className="hidden sm:inline">{greetText},</span>
//           <strong>{firstName}!</strong>
//         </div>
//       </div>

//       {/* ── Main Content ── */}
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

//         {/* Hero */}
//         <div className="text-center mb-10 animate-fade-up">
//           {/* CV Icon */}
//           <div className="inline-flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg shadow-green-200 mb-5">
//             <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
//               <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="white" opacity="0.9"/>
//               <rect x="8" y="10" width="8" height="1.5" rx="0.75" fill="#25A84B"/>
//               <rect x="8" y="13" width="5" height="1.5" rx="0.75" fill="#25A84B"/>
//             </svg>
//             <span className="text-white text-xs font-extrabold tracking-widest mt-0.5">CV</span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
//             We Analyze Your{" "}
//             <span className="text-green-600">Resume</span>{" "}
//             in Seconds!
//           </h1>
//           <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
//             Upload your resume PDF and instantly get an ATS score, strengths,
//             weaknesses, and expert improvement suggestions — powered by AI.
//           </p>
//         </div>

//         {/* Upload Card */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 sm:p-8 mb-8">

//           {/* Drop Zone */}
//           <div
//             onClick={() => document.getElementById("pdfInput").click()}
//             onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
//             onDragLeave={() => setDragging(false)}
//             onDrop={handleDrop}
//             className={`
//               rounded-xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer
//               transition-all duration-200 mb-5
//               ${dragging ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50"}
//               ${file ? "border-green-500 bg-green-50" : ""}
//             `}
//           >
//             <input
//               id="pdfInput"
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               onChange={(e) => handleFile(e.target.files[0])}
//             />

//             {file ? (
//               <div className="flex flex-col items-center gap-2">
//                 <span className="bg-green-600 text-white text-xs font-black tracking-widest px-3 py-1 rounded-md">
//                   PDF
//                 </span>
//                 <p className="text-sm font-semibold text-gray-800 break-all px-4">{file.name}</p>
//                 <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
//                 <button
//                   className="mt-1 text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1 hover:bg-red-50 transition-colors"
//                   onClick={(e) => { e.stopPropagation(); setFile(null); }}
//                 >
//                   Remove file
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-14 h-14 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mb-2">
//                   <svg width="26" height="26" fill="none" stroke="#25A84B" strokeWidth="2" viewBox="0 0 24 24">
//                     <polyline points="16,16 12,12 8,16"/>
//                     <line x1="12" y1="12" x2="12" y2="21"/>
//                     <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
//                   </svg>
//                 </div>
//                 <p className="text-sm sm:text-base font-semibold text-gray-700">
//                   Drag & drop your resume PDF
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-400">
//                   or{" "}
//                   <span className="text-green-600 font-semibold underline underline-offset-2">
//                     click to browse files
//                   </span>
//                 </p>
//                 <p className="text-xs text-gray-300 mt-1">PDF only · Maximum 3,000 words</p>
//               </div>
//             )}
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
//               <span>⚠️</span> {error}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !file}
//             className={`
//               w-full py-3.5 rounded-xl font-bold text-white text-base
//               bg-gradient-to-r from-green-500 to-green-700
//               shadow-lg shadow-green-200
//               flex items-center justify-center gap-2
//               transition-all duration-200
//               ${loading || !file ? "opacity-40 cursor-not-allowed" : "hover:from-green-600 hover:to-green-800 hover:shadow-green-300 active:scale-95"}
//             `}
//           >
//             {loading ? (
//               <>
//                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 Analyzing your resume...
//               </>
//             ) : (
//               <>Get your CV Report &nbsp;→</>
//             )}
//           </button>

//           {/* Trust badges */}
//           <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
//             {["🔒 Secure", "⚡ Instant", "🎯 ATS Ready"].map((b) => (
//               <span key={b} className="text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
//                 {b}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Info cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//           {[
//             { icon: "📊", title: "ATS Score /100", desc: "Know how ATS-friendly your resume is before you apply." },
//             { icon: "💪", title: "Strengths", desc: "Discover what recruiters and ATS systems love about you." },
//             { icon: "⚠️", title: "Weaknesses", desc: "Pinpoint what's holding your resume back from passing." },
//             { icon: "💡", title: "Suggestions", desc: "Clear, actionable tips to improve your score." },
//           ].map((c, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-2xl">{c.icon}</span>
//                 <span className="text-gray-300 text-sm">→</span>
//               </div>
//               <p className="font-bold text-gray-900 text-sm mb-1">{c.title}</p>
//               <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { analyzeResume } from "../services/ai.service.js";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good Morning", emoji: "☀️" };
  if (h < 17) return { text: "Good Afternoon", emoji: "🌤️" };
  return { text: "Good Evening", emoji: "🌙" };
};

export default function ResumeAnalyzer() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { text: greetText, emoji } = getGreeting();
  const firstName = user?.name?.split(" ")[0] || "there";

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") { setError("Only PDF files are allowed."); return; }
    setFile(f); setError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return setError("Please select a PDF file first.");
    setLoading(true); setError("");
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await analyzeResume(formData);
      const data = res.data;

      let parsed;
      try {
        const raw = data.result;
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found");
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        setError("Failed to parse AI response. Please try again.");
        setLoading(false); return;
      }

      navigate("/analysis-result", { state: { result: parsed } });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Top Nav Bar ── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-8 h-14 flex items-center justify-between shadow-sm">
        <span className="font-bold text-base sm:text-lg text-gray-900 tracking-tight">
          Resume Analyzer
        </span>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 text-xs sm:text-sm text-green-800 font-medium">
          <span>{emoji}</span>
          <span className="hidden sm:inline">{greetText},</span>
          <strong>{firstName}!</strong>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg shadow-green-200 mb-5">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="white" opacity="0.9"/>
              <rect x="8" y="10" width="8" height="1.5" rx="0.75" fill="#25A84B"/>
              <rect x="8" y="13" width="5" height="1.5" rx="0.75" fill="#25A84B"/>
            </svg>
            <span className="text-white text-xs font-extrabold tracking-widest mt-0.5">CV</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            We Analyze Your{" "}
            <span className="text-green-600">Resume</span>{" "}
            in Seconds!
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Upload your resume PDF and instantly get an ATS score, strengths,
            weaknesses, and expert improvement suggestions — powered by AI.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 sm:p-8 mb-8">

          {/* Drop Zone */}
          <div
            onClick={() => document.getElementById("pdfInput").click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`
              rounded-xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer
              transition-all duration-200 mb-5
              ${dragging ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50"}
              ${file ? "!border-green-500 !bg-green-50" : ""}
            `}
          >
            <input
              id="pdfInput"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {file ? (
              <div className="flex flex-col items-center gap-2">
                <span className="bg-green-600 text-white text-xs font-black tracking-widest px-3 py-1 rounded-md">
                  PDF
                </span>
                <p className="text-sm font-semibold text-gray-800 break-all px-4">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
                <button
                  className="mt-1 text-xs text-red-500 border border-red-200 rounded-lg px-3 py-1 hover:bg-red-50 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mb-2">
                  <svg width="26" height="26" fill="none" stroke="#25A84B" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="16,16 12,12 8,16"/>
                    <line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-700">
                  Drag & drop your resume PDF
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  or{" "}
                  <span className="text-green-600 font-semibold underline underline-offset-2">
                    click to browse files
                  </span>
                </p>
                <p className="text-xs text-gray-300 mt-1">PDF only · Maximum 3,000 words</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !file}
            className={`
              w-full py-3.5 rounded-xl font-bold text-white text-base
              bg-gradient-to-r from-green-500 to-green-700
              shadow-lg shadow-green-200
              flex items-center justify-center gap-2
              transition-all duration-200
              ${loading || !file ? "opacity-40 cursor-not-allowed" : "hover:from-green-600 hover:to-green-800 hover:shadow-green-300 active:scale-95"}
            `}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing your resume...
              </>
            ) : (
              <>Get your CV Report &nbsp;→</>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            {["🔒 Secure", "⚡ Instant", "🎯 ATS Ready"].map((b) => (
              <span key={b} className="text-xs text-gray-400 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: "📊", title: "ATS Score /100", desc: "Know how ATS-friendly your resume is before you apply." },
            { icon: "💪", title: "Strengths", desc: "Discover what recruiters and ATS systems love about you." },
            { icon: "⚠️", title: "Weaknesses", desc: "Pinpoint what's holding your resume back from passing." },
            { icon: "💡", title: "Suggestions", desc: "Clear, actionable tips to improve your score." },
          ].map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{c.icon}</span>
                <span className="text-gray-300 text-sm">→</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{c.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}