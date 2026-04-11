// components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
const Navbar = () => {

  // const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how" },
    { label: "Preview", href: "/#templates" },
    { label: "Templates", href: "/templates" },
    {label:"AI Analyzer", href:"/resume-analyzer"}
  ];

  // ── Key function: handles both same-page scroll AND cross-page scroll ──
  const handleNavClick = (e, href) => {
    // If it's a real route like "/templates", do nothing — let Link handle it
    if (!href.includes("#")) return;

    e.preventDefault();
    const sectionId = href.split("#")[1]; // gets "home", "features", "how", "templates"

    if (location.pathname === "/") {
      // Already on landing page — just smooth scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // On a different page — navigate to "/" first, then scroll
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // 100ms wait for landing page to render
    }

    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
  bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800
  ${scrolled ? "shadow-md" : ""}`}
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
            {navLinks.map((l) =>
              l.href.includes("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors cursor-pointer"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
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
            aria-label="Open menu"
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
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Logo */}
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <span className="text-gray-900 font-black text-xl tracking-tight mb-8 block">
                Resume<span className="text-green-500">Craft</span>
              </span>
            </Link>

            {/* Mobile nav links */}
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((l) =>
                l.href.includes("#") ? (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA buttons */}
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

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }
      `}</style>
    </>
  );
};

export default Navbar;