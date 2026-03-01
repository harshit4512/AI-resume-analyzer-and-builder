// pages/Landing.jsx
// Full landing page + responsive navbar with mobile sidebar
// Design: clean white/green inspired by reference, bold typography, smooth animations

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home",     href: "#home"     },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how"  },
    { label: "Templates", href: "#templates" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="text-gray-900 font-black text-xl tracking-tight">
              Resume<span className="text-green-500">Craft</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="w-6 h-0.5 bg-gray-700 rounded" />
            <span className="w-6 h-0.5 bg-gray-700 rounded" />
            <span className="w-4 h-0.5 bg-gray-700 rounded" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Sidebar Overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="relative ml-auto w-72 h-full bg-white shadow-2xl flex flex-col p-6 animate-slide-in">
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-lg font-bold mb-6"
            >
              ✕
            </button>

            {/* Logo */}
            <span className="text-gray-900 font-black text-xl tracking-tight mb-8">
              Resume<span className="text-green-500">Craft</span>
            </span>

            {/* Nav links */}
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-center border border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-green-500 hover:text-green-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-center bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── Feature Card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, delay }) => (
  <div
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

// ── Step Card ─────────────────────────────────────────────────────────────────
const StepCard = ({ number, title, desc }) => (
  <div className="flex gap-5 items-start">
    <div className="w-10 h-10 shrink-0 bg-green-500 text-white rounded-full flex items-center justify-center font-black text-lg shadow-md">
      {number}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Template Preview Card ─────────────────────────────────────────────────────
const TemplateCard = ({ name, color, accent }) => (
  <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
    {/* Fake resume preview */}
    <div className={`${color} p-5 h-52`}>
      <div className={`${accent} h-8 rounded-lg mb-3 w-2/3`} />
      <div className="bg-white/40 h-2 rounded mb-2 w-full" />
      <div className="bg-white/40 h-2 rounded mb-2 w-4/5" />
      <div className="bg-white/40 h-2 rounded mb-4 w-3/5" />
      <div className={`${accent} h-4 rounded mb-2 w-1/3`} />
      <div className="bg-white/30 h-2 rounded mb-1 w-full" />
      <div className="bg-white/30 h-2 rounded mb-1 w-5/6" />
      <div className="bg-white/30 h-2 rounded w-4/6" />
    </div>
    <div className="bg-white px-4 py-3 flex items-center justify-between">
      <span className="font-semibold text-gray-800 text-sm">{name}</span>
      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Free</span>
    </div>
  </div>
);

// ── Main Landing Page ─────────────────────────────────────────────────────────
const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }

        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.7s ease-out both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 bg-green-300 rounded-full opacity-15 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left — Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Free Resume Builder — No Sign-up Required to Browse
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6 animate-fade-up delay-100">
              Build Your
              <span className="text-green-500 block">Dream Resume</span>
              in Minutes
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md animate-fade-up delay-200">
              Create, customize and download professional resumes with live preview,
              multiple templates, and one-click PDF export. Land your dream job faster.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link
                to="/register"
                className="px-7 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all hover:shadow-green-300 hover:-translate-y-0.5 text-base"
              >
                Get Started Free →
              </Link>
              <a
                href="#how"
                className="px-7 py-3.5 border-2 border-gray-200 hover:border-green-400 text-gray-700 hover:text-green-600 font-bold rounded-xl transition-all text-base"
              >
                See How It Works
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-10 animate-fade-up delay-400">
              <div className="flex -space-x-2">
                {["🧑‍💻","👩‍🎓","👨‍💼","👩‍🔬","🧑‍🎨"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-xs gap-0.5">★★★★★</div>
                <p className="text-xs text-gray-500 mt-0.5">Trusted by <strong className="text-gray-800">10,000+</strong> job seekers</p>
              </div>
            </div>
          </div>

          {/* Right — Floating resume mockup */}
          <div className="flex justify-center md:justify-end animate-float">
            <div className="relative">
              {/* Shadow card behind */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-green-200 rounded-3xl opacity-50" />

              {/* Main resume card */}
              <div className="relative bg-white rounded-3xl shadow-2xl w-72 p-6 border border-gray-100">
                {/* Resume header */}
                <div className="bg-green-500 rounded-2xl p-4 mb-4">
                  <div className="w-10 h-10 bg-white/30 rounded-full mb-2" />
                  <div className="h-3 bg-white/60 rounded w-2/3 mb-1" />
                  <div className="h-2 bg-white/40 rounded w-1/2" />
                </div>

                {/* Section: Summary */}
                <div className="mb-4">
                  <div className="h-2.5 bg-green-500 rounded w-1/3 mb-2" />
                  <div className="h-2 bg-gray-200 rounded mb-1 w-full" />
                  <div className="h-2 bg-gray-200 rounded mb-1 w-5/6" />
                  <div className="h-2 bg-gray-200 rounded w-4/6" />
                </div>

                {/* Section: Experience */}
                <div className="mb-4">
                  <div className="h-2.5 bg-green-500 rounded w-1/3 mb-2" />
                  <div className="h-2 bg-gray-100 rounded mb-1 w-full" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                </div>

                {/* Section: Skills chips */}
                <div>
                  <div className="h-2.5 bg-green-500 rounded w-1/4 mb-2" />
                  <div className="flex flex-wrap gap-1">
                    {["React","Node.js","MongoDB","Git"].map((s) => (
                      <span key={s} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Download badge */}
                <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <span className="text-xs text-gray-500 font-medium">Ready to download</span>
                  <span className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">↓</span>
                </div>
              </div>

              {/* Floating badge — Live Preview */}
              <div className="absolute -left-10 top-1/3 bg-white shadow-lg rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-100">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">Live Preview</span>
              </div>

              {/* Floating badge — 3 Templates */}
              <div className="absolute -right-8 bottom-10 bg-green-500 shadow-lg rounded-xl px-3 py-2 text-white text-xs font-bold">
                3 Templates ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Features</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
              Everything You Need
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              A complete resume building toolkit — from filling your details to downloading a polished PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="⚡" title="Live Preview" desc="See your resume update in real time as you type. No surprises — what you see is exactly what gets downloaded." delay="0ms" />
            <FeatureCard icon="🎨" title="3 Beautiful Templates" desc="Choose from Modern, Minimal, and Classic layouts. Every template is professionally designed and ATS-friendly." delay="50ms" />
            <FeatureCard icon="📄" title="One-Click PDF Download" desc="Export a crisp, formatted PDF instantly. No watermarks, no paywalls — yours to use forever." delay="100ms" />
            <FeatureCard icon="✏️" title="Full CRUD Operations" desc="Create multiple resumes, edit any existing one, update details anytime, or delete resumes you no longer need." delay="150ms" />
            <FeatureCard icon="🔒" title="Secure & Private" desc="Your data is protected behind JWT authentication. Only you can access, edit, and download your resumes." delay="200ms" />
            <FeatureCard icon="💾" title="Auto-Save Draft" desc="Never lose your progress. Your resume is automatically persisted locally so you can pick up right where you left off." delay="250ms" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Steps */}
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-10">
              Ready in<br />4 Simple Steps
            </h2>

            <div className="flex flex-col gap-8">
              <StepCard number="1" title="Create Your Account" desc="Sign up for free in under 30 seconds. No credit card required, no hidden fees." />
              <StepCard number="2" title="Fill In Your Details" desc="Enter your personal info, experience, education, skills and projects using our guided forms." />
              <StepCard number="3" title="Pick a Template" desc="Choose from Modern, Minimal or Classic. Switch anytime — the live preview updates instantly." />
              <StepCard number="4" title="Download Your PDF" desc="Hit download and get a professionally formatted PDF ready to send to any employer." />
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden md:flex justify-center">
            <div className="w-80 h-80 bg-green-100 rounded-full flex items-center justify-center relative">
              {/* Center icon */}
              <div className="w-32 h-32 bg-green-500 rounded-3xl flex items-center justify-center shadow-xl animate-float">
                <span className="text-6xl">📄</span>
              </div>

              {/* Orbiting badges */}
              {[
                { label: "Fill Details", pos: "top-4 left-1/2 -translate-x-1/2", icon: "📝" },
                { label: "Pick Template", pos: "right-0 top-1/2 -translate-y-1/2", icon: "🎨" },
                { label: "Download PDF", pos: "bottom-4 left-1/2 -translate-x-1/2", icon: "⬇️" },
                { label: "Sign Up Free", pos: "left-0 top-1/2 -translate-y-1/2", icon: "🔐" },
              ].map((b) => (
                <div key={b.label} className={`absolute ${b.pos} bg-white shadow-md rounded-xl px-3 py-2 flex items-center gap-2`}>
                  <span>{b.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ────────────────────────────────────────────────────────── */}
      <section id="templates" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Templates</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
              Choose Your Style
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Three professionally designed templates, all free, all ATS-compatible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <TemplateCard name="Modern"       color="bg-blue-600"  accent="bg-white/80" />
            <TemplateCard name="Minimal"      color="bg-gray-800"  accent="bg-white/80" />
            <TemplateCard name="Professional" color="bg-green-600" accent="bg-white/80" />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-green-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-600 rounded-full opacity-30 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Your Dream Job is<br />One Resume Away
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of job seekers who built their resume with ResumeCraft. Free forever.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-green-600 font-black text-lg rounded-2xl hover:bg-gray-50 shadow-xl transition-all hover:-translate-y-1"
          >
            Build My Resume Now →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-white font-black text-xl">
                Resume<span className="text-green-500">Craft</span>
              </span>
              <p className="text-sm mt-1">Build. Customize. Download.</p>
            </div>

            <div className="flex gap-8 text-sm">
              <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
              <a href="#how"      className="hover:text-green-400 transition-colors">How It Works</a>
              <a href="#templates" className="hover:text-green-400 transition-colors">Templates</a>
              <Link to="/login"   className="hover:text-green-400 transition-colors">Login</Link>
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

export default Landing;