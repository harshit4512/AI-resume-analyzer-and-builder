// pages/Templates.jsx
// Full templates page matching ResumeCraft green/white theme
// Sections: Modern | ATS | Minimal — switchable tabs
// Dynamic grid, hover "Use Template" button, photo placeholder slots
// Fully responsive with Tailwind CSS

import { useState } from "react";
import { Link } from "react-router-dom";

// ── Navbar (same as Landing) ──────────────────────────────────────────────────
import Navbar from "../components/layout/Navbar"; // assumes shared Navbar component
// If you don't have a shared Navbar, paste the Navbar from Landing.jsx here

// ── helpers ───────────────────────────────────────────────────────────────────
const TAG_STYLES = {
  Free:    "bg-green-50 text-green-600 border border-green-200",
  Pro:     "bg-amber-50 text-amber-600 border border-amber-200",
  New:     "bg-blue-50 text-blue-600 border border-blue-200",
  Popular: "bg-purple-50 text-purple-600 border border-purple-200",
};

// ── Resume Previews (SVG-like divs) ──────────────────────────────────────────

// Shared line component
const Line  = ({ w = "full", h = "2", color = "bg-gray-200", mt = "1" }) => (
  <div className={`h-${h} bg-${color} rounded w-${w} mt-${mt}`} />
);

// Modern sidebar preview
const PreviewModern = ({ accent = "bg-green-500", sidebar = "bg-green-600" }) => (
  <div className="w-full h-full bg-white flex overflow-hidden rounded-t-xl">
    {/* sidebar */}
    <div className={`${sidebar} w-[38%] p-3 flex flex-col gap-1.5`}>
      <div className="w-10 h-10 rounded-full bg-white/30 mb-1 mx-auto" />
      <div className="h-2 bg-white/70 rounded w-4/5 mx-auto" />
      <div className="h-1.5 bg-white/40 rounded w-3/5 mx-auto" />
      <div className="h-px bg-white/20 my-1.5" />
      <div className="h-1.5 bg-white/50 rounded w-full" />
      <div className="h-1.5 bg-white/40 rounded w-4/5" />
      <div className="h-1.5 bg-white/40 rounded w-3/5" />
      <div className="h-px bg-white/20 my-1.5" />
      <div className="h-1.5 bg-white/50 rounded w-full" />
      <div className="h-1.5 bg-white/40 rounded w-4/5" />
    </div>
    {/* main */}
    <div className="flex-1 p-3 flex flex-col gap-1.5">
      <div className={`h-2 ${accent} rounded w-2/5`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      <div className="h-px bg-gray-100 my-1" />
      <div className={`h-2 ${accent} rounded w-2/5`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-px bg-gray-100 my-1" />
      <div className={`h-2 ${accent} rounded w-1/3`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
    </div>
  </div>
);

// ATS classic preview
const PreviewATS = ({ topBar = "bg-gray-800", accent = "bg-gray-700" }) => (
  <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-xl">
    <div className={`${topBar} px-4 py-3`}>
      <div className="h-3 bg-white/80 rounded w-3/5 mb-1" />
      <div className="h-2 bg-white/50 rounded w-2/5" />
      <div className="h-1.5 bg-white/30 rounded w-3/5 mt-1" />
    </div>
    <div className="flex-1 p-3 flex flex-col gap-1.5">
      <div className={`h-2 ${accent} rounded w-2/5`} />
      <div className="h-px bg-gray-300 mb-0.5" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      <div className={`h-2 ${accent} rounded w-1/3 mt-1.5`} />
      <div className="h-px bg-gray-300 mb-0.5" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      <div className={`h-2 ${accent} rounded w-2/5 mt-1.5`} />
      <div className="h-px bg-gray-300 mb-0.5" />
      <div className="flex gap-1 flex-wrap mt-0.5">
        {[3, 4, 3, 5].map((w, i) => (
          <div key={i} className={`h-3 ${accent} opacity-30 rounded-full`} style={{ width: `${w * 8}px` }} />
        ))}
      </div>
    </div>
  </div>
);

// Minimal preview
const PreviewMinimal = ({ accentBar = "bg-green-500", topBand = false }) => (
  <div className={`w-full h-full bg-white flex flex-col overflow-hidden rounded-t-xl ${topBand ? "border-t-4 border-green-500" : "border-l-4 border-green-500"}`}>
    <div className="p-4 flex flex-col gap-1.5 flex-1">
      <div className="h-3 bg-gray-900 rounded w-3/5" />
      <div className="h-2 bg-gray-400 rounded w-2/5" />
      <div className="flex gap-3 mt-0.5">
        <div className="h-1.5 bg-gray-300 rounded w-16" />
        <div className="h-1.5 bg-gray-300 rounded w-12" />
        <div className="h-1.5 bg-gray-300 rounded w-14" />
      </div>
      <div className="h-px bg-gray-100 my-1.5" />
      <div className={`h-2 ${accentBar} rounded w-2/5`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      <div className="h-px bg-gray-100 my-1.5" />
      <div className={`h-2 ${accentBar} rounded w-1/3`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      <div className="h-px bg-gray-100 my-1.5" />
      <div className={`h-2 ${accentBar} rounded w-1/4`} />
      <div className="flex gap-1 flex-wrap mt-0.5">
        {[3, 4, 3, 5, 3].map((w, i) => (
          <div key={i} className="h-3 bg-green-100 rounded-full" style={{ width: `${w * 8}px` }} />
        ))}
      </div>
    </div>
  </div>
);

// Two-column ATS
const PreviewTwoCol = ({ accent = "bg-gray-800" }) => (
  <div className="w-full h-full bg-white flex overflow-hidden rounded-t-xl">
    <div className="w-[42%] bg-slate-700 p-3 flex flex-col gap-1.5">
      <div className="w-10 h-10 rounded-full bg-white/20 mb-1" />
      <div className="h-2 bg-white/70 rounded w-4/5" />
      <div className="h-1.5 bg-white/40 rounded w-3/5" />
      <div className="h-px bg-white/20 my-1.5" />
      <div className="h-1.5 bg-white/60 rounded w-3/5" />
      <div className="h-1.5 bg-white/40 rounded w-full" />
      <div className="h-1.5 bg-white/40 rounded w-5/6" />
      <div className="h-1.5 bg-white/40 rounded w-4/6" />
      <div className="h-px bg-white/20 my-1.5" />
      <div className="h-1.5 bg-white/60 rounded w-2/5" />
      {[3, 4, 3, 5].map((w, i) => (
        <div key={i} className="h-2.5 bg-white/25 rounded-full" style={{ width: `${w * 10}%` }} />
      ))}
    </div>
    <div className="flex-1 p-3 flex flex-col gap-1.5">
      <div className={`h-2 ${accent} rounded w-2/5`} />
      <div className="h-px bg-gray-200 mb-0.5" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      <div className={`h-2 ${accent} rounded w-1/3 mt-1.5`} />
      <div className="h-px bg-gray-200 mb-0.5" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      <div className="h-1.5 bg-gray-200 rounded w-3/5" />
    </div>
  </div>
);

// Clean centered ATS
const PreviewCentered = ({ accent = "bg-green-600" }) => (
  <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-xl">
    <div className="px-4 pt-4 pb-2 flex flex-col items-center gap-1">
      <div className="h-3 bg-gray-900 rounded w-2/5" />
      <div className="h-2 bg-gray-400 rounded w-1/3" />
      <div className="flex gap-2 mt-0.5">
        <div className="h-1.5 bg-gray-300 rounded w-12" />
        <div className="h-1.5 bg-gray-300 rounded w-10" />
      </div>
      <div className={`h-0.5 ${accent} w-full mt-1.5`} />
    </div>
    <div className="flex-1 px-4 flex flex-col gap-1.5">
      <div className={`h-2 ${accent} rounded w-2/5`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className={`h-2 ${accent} rounded w-1/3 mt-1`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      <div className="h-1.5 bg-gray-200 rounded w-3/5" />
      <div className={`h-2 ${accent} rounded w-2/5 mt-1`} />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

// Bold header minimal
const PreviewBoldHeader = ({ headerBg = "bg-green-500" }) => (
  <div className="w-full h-full bg-white flex flex-col overflow-hidden rounded-t-xl">
    <div className={`${headerBg} px-4 py-3`}>
      <div className="h-3 bg-white/90 rounded w-3/5 mb-1" />
      <div className="h-2 bg-white/60 rounded w-2/5" />
    </div>
    <div className="flex-1 p-3 flex flex-col gap-1.5">
      <div className="h-2 bg-green-500 rounded w-2/5" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      <div className="h-px bg-gray-100 my-1" />
      <div className="h-2 bg-green-500 rounded w-1/3" />
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-4/5" />
      <div className="h-px bg-gray-100 my-1" />
      <div className="h-2 bg-green-500 rounded w-1/4" />
      <div className="flex gap-1 flex-wrap mt-0.5">
        {[3, 4, 3, 5].map((w, i) => (
          <div key={i} className="h-3 bg-green-50 border border-green-200 rounded-full" style={{ width: `${w * 8}px` }} />
        ))}
      </div>
    </div>
  </div>
);

// ── Photo Placeholder Slot ────────────────────────────────────────────────────
const PhotoSlot = () => (
  <div className="group relative bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-green-400 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 gap-3 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-14 h-14 rounded-2xl bg-green-50 border-2 border-dashed border-green-300 flex items-center justify-center text-green-400 text-2xl font-bold group-hover:bg-green-100 transition-colors">
        +
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-400">Add Template</p>
        <p className="text-xs text-gray-300 mt-0.5">Drop preview image here</p>
      </div>
    </div>
    <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center justify-between">
      <span className="text-sm font-medium text-gray-300">Your Template</span>
    </div>
  </div>
);

// ── Template Card ─────────────────────────────────────────────────────────────
const TemplateCard = ({ name, tag = "Free", PreviewComponent, previewProps = {}, delay = 0 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-100 hover:border-green-200 flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {/* The resume preview */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{ filter: hovered ? "blur(1px) brightness(0.6)" : "none" }}
        >
          <PreviewComponent {...previewProps} />
        </div>

        {/* Hover overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Use Template button */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-6 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <Link
            to="/register"
            className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-green-500/30 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            Use Template
          </Link>
        </div>
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50 bg-white">
        <span className="text-sm font-semibold text-gray-800">{name}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TAG_STYLES[tag]}`}>
          {tag}
        </span>
      </div>
    </div>
  );
};

// ── Tab Button ────────────────────────────────────────────────────────────────
const TabBtn = ({ label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      active
        ? "bg-green-500 text-white shadow-md shadow-green-200"
        : "text-gray-500 hover:text-green-600 hover:bg-green-50"
    }`}
  >
    {label}
    <span
      className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
        active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-400"
      }`}
    >
      {count}
    </span>
  </button>
);

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ title, desc }) => (
  <div className="mb-8">
    <h2 className="font-display text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
    <p className="text-gray-400 text-sm mt-1.5 max-w-lg">{desc}</p>
  </div>
);

// ── Template Data ─────────────────────────────────────────────────────────────
const MODERN_TEMPLATES = [
  { name: "Nexus",     tag: "Free",    PreviewComponent: PreviewModern,    previewProps: { accent: "bg-green-500",  sidebar: "bg-green-600"  } },
  { name: "Horizon",   tag: "New",     PreviewComponent: PreviewModern,    previewProps: { accent: "bg-teal-500",   sidebar: "bg-teal-700"   } },
  { name: "Vivid",     tag: "Pro",     PreviewComponent: PreviewBoldHeader, previewProps: { headerBg: "bg-rose-500" } },
  { name: "Amber",     tag: "Free",    PreviewComponent: PreviewModern,    previewProps: { accent: "bg-amber-500",  sidebar: "bg-amber-800"  } },
  { name: "Indigo",    tag: "Popular", PreviewComponent: PreviewModern,    previewProps: { accent: "bg-indigo-500", sidebar: "bg-indigo-700" } },
  // ← photo slot auto-appended below
];

const ATS_TEMPLATES = [
  { name: "Classic",   tag: "Free",    PreviewComponent: PreviewATS,       previewProps: { topBar: "bg-gray-800",   accent: "bg-gray-700"   } },
  { name: "Corporate", tag: "Free",    PreviewComponent: PreviewATS,       previewProps: { topBar: "bg-slate-700",  accent: "bg-slate-600"  } },
  { name: "Dual",      tag: "Pro",     PreviewComponent: PreviewTwoCol,    previewProps: { accent: "bg-gray-800"   } },
  { name: "Executive", tag: "New",     PreviewComponent: PreviewATS,       previewProps: { topBar: "bg-blue-900",   accent: "bg-blue-700"   } },
  { name: "Centered",  tag: "Free",    PreviewComponent: PreviewCentered,  previewProps: { accent: "bg-green-600"  } },
];

const MINIMAL_TEMPLATES = [
  { name: "Pure",      tag: "Free",    PreviewComponent: PreviewMinimal,   previewProps: { accentBar: "bg-green-500", topBand: false } },
  { name: "Scarlet",   tag: "Pro",     PreviewComponent: PreviewMinimal,   previewProps: { accentBar: "bg-rose-500",  topBand: false } },
  { name: "Ocean",     tag: "Free",    PreviewComponent: PreviewMinimal,   previewProps: { accentBar: "bg-cyan-500",  topBand: true  } },
  { name: "Align",     tag: "New",     PreviewComponent: PreviewCentered,  previewProps: { accent: "bg-gray-800"  } },
  { name: "Subtle",    tag: "Free",    PreviewComponent: PreviewMinimal,   previewProps: { accentBar: "bg-slate-500", topBand: true  } },
];

const TABS = [
  { id: "modern",  label: "Modern",       data: MODERN_TEMPLATES,  desc: "Bold, creative designs for design, marketing & tech roles." },
  { id: "ats",     label: "ATS Friendly", data: ATS_TEMPLATES,     desc: "Structured and clean — engineered to pass every applicant tracking system." },
  { id: "minimal", label: "Minimal",      data: MINIMAL_TEMPLATES, desc: "Let your content lead. Refined whitespace and subtle typography." },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
const TemplatesPage = () => {
  const [activeTab, setActiveTab] = useState("modern");

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.5s ease-out both; }

        @keyframes tab-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-tab-in { animation: tab-in 0.3s ease-out both; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <Navbar />

      {/* ── HERO HEADER ──────────────────────────────────────────────────────── */}
      <section
        className="pt-28 pb-14 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 60%, #f0fdf4 100%)" }}
      >
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-green-300 rounded-full opacity-10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 animate-fade-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            50+ Templates · All ATS-Compatible · Free to Use
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4 animate-fade-up delay-100">
            Resume Templates That
            <span className="text-green-500 block">Get You Hired</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up delay-200">
            Professionally designed, ATS-friendly templates. Pick one, fill it in, and download your PDF in minutes.
          </p>

          {/* Hero CTA row */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-300">
            <Link
              to="/register"
              className="px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 text-sm"
            >
              Create My Resume Free →
            </Link>
            <a
              href="#templates"
              className="px-7 py-3.5 border-2 border-gray-200 hover:border-green-300 text-gray-600 hover:text-green-600 font-bold rounded-xl transition-all text-sm"
            >
              Browse Templates ↓
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 animate-fade-up delay-300">
            {[
              { num: "50+", label: "Templates" },
              { num: "98%", label: "ATS Pass Rate" },
              { num: "10K+", label: "Resumes Built" },
              { num: "Free", label: "No Paywall" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-black text-xl text-gray-900">{s.num}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────────────────────── */}
      <div id="templates" className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100 overflow-x-auto max-w-full">
            {TABS.map(t => (
              <TabBtn
                key={t.id}
                label={t.label}
                active={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                count={t.data.length + 1}
              />
            ))}
          </div>

          {/* Upload / Create CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-green-300 text-sm font-semibold text-gray-600 hover:text-green-600 rounded-xl transition-colors">
              <span>↑</span> Upload Resume
            </button>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
            >
              + Create New
            </Link>
          </div>
        </div>
      </div>

      {/* ── TEMPLATES GRID ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-12">
        {/* Section description */}
        <div
          key={activeTab}
          className="animate-tab-in"
        >
          <SectionHeader
            title={currentTab.label + " Templates"}
            desc={currentTab.desc}
          />

          {/* Dynamic Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {currentTab.data.map((tpl, i) => (
              <TemplateCard
                key={tpl.name}
                {...tpl}
                delay={i * 60}
              />
            ))}

            {/* Photo placeholder slot — always last */}
            <PhotoSlot />
          </div>
        </div>
      </section>

      {/* ── WHY OUR TEMPLATES ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-green-600 font-semibold text-xs uppercase tracking-widest">Why ResumeCraft</span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Templates Built to Perform
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "⚡", title: "Live Preview",      desc: "See changes instantly as you type — no page refresh needed." },
              { icon: "🤖", title: "ATS Optimized",     desc: "Every template passes leading ATS software used by top employers." },
              { icon: "📄", title: "Clean PDF Export",  desc: "One-click download — no watermarks, no hidden paywalls." },
              { icon: "🎨", title: "Fully Customizable", desc: "Change colors, fonts, and sections to match your personal brand." },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl mb-3">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-green-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-600 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
            Found Your Template?<br />Let's Build Your Resume.
          </h2>
          <p className="text-green-100 text-base mb-8 max-w-md mx-auto">
            Sign up free and start editing your chosen template in under a minute.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-green-600 font-black text-base rounded-2xl hover:bg-gray-50 shadow-xl transition-all hover:-translate-y-1"
          >
            Build My Resume Now →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <span className="text-white font-black text-xl">
                Resume<span className="text-green-500">Craft</span>
              </span>
              <p className="text-sm mt-1">Build. Customize. Download.</p>
            </div>
            <div className="flex gap-6 text-sm flex-wrap justify-center">
              <Link to="/"          className="hover:text-green-400 transition-colors">Home</Link>
              <a    href="#templates" className="hover:text-green-400 transition-colors">Templates</a>
              <Link to="/login"     className="hover:text-green-400 transition-colors">Login</Link>
              <Link to="/register"  className="hover:text-green-400 transition-colors">Sign Up</Link>
            </div>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} ResumeCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TemplatesPage;