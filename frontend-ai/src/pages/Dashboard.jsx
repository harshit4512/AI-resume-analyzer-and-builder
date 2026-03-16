// pages/Dashboard.jsx
import { useEffect, useState, useRef } from "react"
import { getResumes, downloadResumePDF, deleteResume } from "../services/resume.service"
import { logoutUser,getMe } from "../services/auth.service.js"
import { Link, useNavigate,useSearchParams } from "react-router-dom"
import { useResumeStore } from "../store/resumeStore.js"
import { useAuthStore } from "../store/authStore.js"
// import Navbar from "../components/layout/Navbar.jsx"





// // ── Template preview colors ───────────────────────────────────────────────────
const TEMPLATE_STYLES = {
  modern: { bg: "bg-blue-600", badge: "bg-blue-100 text-blue-700" },
  minimal: { bg: "bg-gray-800", badge: "bg-gray-100 text-gray-700" },
  professional: { bg: "bg-green-600", badge: "bg-green-100 text-green-700" },
}

const STATUS_BADGE = {
  draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
  final: "bg-green-100 text-green-700 border-green-200",
}

// ── Mini resume card visual ───────────────────────────────────────────────────
const ResumeCardVisual = ({ template }) => {
  const bg = TEMPLATE_STYLES[template]?.bg || "bg-blue-600"
  return (
    <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-3">
      <div className={`${bg} rounded-lg p-2 mb-2`}>
        <div className="w-6 h-6 bg-white/30 rounded-full mb-1" />
        <div className="h-1.5 bg-white/60 rounded w-2/3 mb-1" />
        <div className="h-1 bg-white/40 rounded w-1/2" />
      </div>
      <div className="space-y-1">
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-4/5" />
        <div className="h-1.5 bg-gray-200 rounded w-3/5" />
      </div>
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = ({ className = "w-3 h-3" }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

// ── Dashboard ─────────────────────────────────────────────────────────────────
// const Dashboard = () => {
//   const navigate = useNavigate()
//   const logout = useAuthStore((s) => s.logout)
//   const user = useAuthStore((s) => s.user)

//   const [resumes, setResumes] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [deleting, setDeleting] = useState(null)
//   const [downloading, setDownloading] = useState(null)
//   const [profileOpen, setProfileOpen] = useState(false)
//   const [mobileMenu, setMobileMenu] = useState(false)

//   const profileRef = useRef(null)
//   const mobileRef = useRef(null)

//   // ✅ add this — syncs auth state after Google OAuth redirect
//   useEffect(() => {
//     const syncAuth = async () => {
//       try {
//         const res = await getMe()
//         useAuthStore.setState({
//           user: res.data.user,
//           isAuthenticated: true,
//         })
//       } catch {
//         // not logged in
//       }
//     }
//     syncAuth()
//   }, [])

  const Dashboard = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams() // ✅ add this
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [downloading, setDownloading] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const profileRef = useRef(null)
  const mobileRef = useRef(null)

  // ✅ handle Google OAuth token from URL
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");

    if (tokenFromUrl) {
      // store token in authStore
      useAuthStore.setState({
        token: tokenFromUrl,
        isAuthenticated: true,
      });
      // clean the URL
      setSearchParams({});
      // fetch user info
      getMe().then(res => {
        useAuthStore.setState({
          user: res.data.user,
          isAuthenticated: true,
        });
      }).catch(() => {});
      return;
    }

    // normal sync for cookie-based auth
    const syncAuth = async () => {
      try {
        const res = await getMe();
        useAuthStore.setState({
          user: res.data.user,
          isAuthenticated: true,
        });
      } catch {
        // not logged in
      }
    };
    syncAuth();
  }, []);


  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false)
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setMobileMenu(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getResumes()
        setResumes(res.data.resumes || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      navigate("/login")
    } catch (error) {
      console.log(error)
      // force logout even if API call fails
      logout()
      navigate("/login")
    }
  }

  const handleCreateNew = () => {
    useResumeStore.getState().clearResume?.()
    navigate("/builder")
  }

  const handleEdit = (resume) => {
    useResumeStore.setState({
      _id: resume._id,
      title: resume.title,
      template: resume.template,
      status: resume.status,
      personalInfo: resume.personalInfo,
      summary: resume.summary || "",
      links: resume.links || { github: "", linkedin: "", leetcode: "" },
      skills: resume.skills || { technical: [], coreSubjects: [], communication: [], tools: [] },
      education: resume.education || [],
      experience: resume.experience || [],
      projects: resume.projects || [],
    })
    navigate("/builder")
  }

  const TEMPLATE_IMAGES = {
    modern: "https://i.pinimg.com/1200x/a9/5c/67/a95c67b6235b1a0af378281136e1ddef.jpg",
    minimal: "https://i.pinimg.com/1200x/7e/aa/d1/7eaad1691e3897a5a36640466909cc74.jpg",
    professional: "https://i.pinimg.com/1200x/fe/7f/f7/fe7ff76cc77473a976ecc25a3523f76a.jpg",
  }

  const handleDownload = async (id, title) => {
    setDownloading(id)
    try {
      const response = await downloadResumePDF(id)
      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${title || "resume"}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert("Download failed ❌")
    } finally {
      setDownloading(null)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await deleteResume(id)
      setResumes((prev) => prev.filter((r) => r._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed ❌")
    } finally {
      setDeleting(null)
    }
  }

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : "U"

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        * { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease-out both; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pop-in { animation: popIn 0.2s ease-out both; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-down { animation: slideDown 0.25s ease-out both; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════════════════ */}

      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">R</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-black text-gray-900">
              Resume<span className="text-green-500">Craft</span>
            </span>
          </Link>

          {/* <Navbar/> */}

          {/* Desktop right side */}
          <div className="  hidden sm:flex items-center gap-3">
            <Link
              to="/resume-analyzer"
              className="flex items-center gap-1.5 px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-sm font-bold rounded-xl transition-all"
            >
              ✦ AI Analyzer
            </Link>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5"
            >
              <span className="text-base leading-none">+</span>
              New Resume
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-xs">{initials}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{user?.username || "User"}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="pop-in absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-4 bg-gradient-to-br from-green-50 to-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-white font-black text-sm">{initials}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{user?.username || "User"}</p>
                        <p className="text-gray-400 text-xs truncate">{user?.email || ""}</p>
                      </div>
                    </div>
                  </div>
                  {/* Resume count */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <span className="text-xs text-gray-400">Total Resumes</span>
                    <span className="text-sm font-bold text-green-600">{resumes.length}</span>
                  </div>

                  <Link
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-semibold border-b border-gray-100"
                  >
                    🏠 Go to Home
                  </Link>
                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile — avatar + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={handleCreateNew}
              className="flex items-center justify-center w-9 h-9 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-xl transition-colors"
            >
              +
            </button>

            {/* Mobile profile dropdown */}
            <div className="relative" ref={mobileRef}>


              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center"
              >
                <span className="text-white font-black text-xs">{initials}</span>
              </button>

              {mobileMenu && (
                <div className="slide-down absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-green-50 border-b border-gray-100">
                    <p className="font-bold text-gray-900 text-sm">{user?.username || "User"}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email || ""}</p>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
                    <span className="text-xs text-gray-400">Resumes</span>
                    <span className="text-sm font-bold text-green-600">{resumes.length}</span>
                  </div>

                  <Link
                    to="/resume-analyzer"
                    onClick={() => setMobileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-green-600 hover:bg-green-50 text-sm font-semibold border-b border-gray-100"
                  >
                    ✦ AI Analyzer
                  </Link>

                  
                  <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 text-sm font-semibold border-b border-gray-100"
                  >
                    🏠 Go to Home
                  </Link>



                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 text-sm font-semibold"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN
      ═══════════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Page header */}
        <div className="mb-8 fade-up">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900">My Resumes</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {resumes.length > 0
              ? `You have ${resumes.length} resume${resumes.length !== 1 ? "s" : ""}. Click Edit to update or PDF to export.`
              : "Create your first resume to get started."}
          </p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading your resumes...</p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && resumes.length === 0 && (
          <div className="fade-up flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-4xl mb-5">📄</div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-gray-800 mb-2">No resumes yet</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-xs">
              Create your first professional resume — it takes less than 5 minutes.
            </p>
            <button
              onClick={handleCreateNew}
              className="px-7 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5 text-sm"
            >
              + Create My First Resume
            </button>
          </div>
        )}

        {/* ── Resume cards grid ── */}
        {!loading && resumes.length > 0 && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Create new card */}
            <button
              onClick={handleCreateNew}
              className="fade-up group border-2 border-dashed border-gray-200 hover:border-green-400 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition-all hover:bg-green-50 min-h-[240px] sm:min-h-[260px]"
            >
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-green-100 rounded-2xl flex items-center justify-center transition-colors">
                <span className="text-2xl text-gray-400 group-hover:text-green-500 transition-colors font-light">+</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-500 group-hover:text-green-600 text-sm transition-colors">New Resume</p>
                <p className="text-xs text-gray-400 mt-0.5">Start from scratch</p>
              </div>
            </button>

            {/* Resume cards */}
            {resumes.map((resume, idx) => (
              <div
                key={resume._id}
                className="fade-up bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col overflow-hidden"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Visual */}
                <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100 h-36 sm:h-40">
                  <img
                    src={TEMPLATE_IMAGES[resume.template] || TEMPLATE_IMAGES.modern}
                    alt={resume.template}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="px-3 sm:px-4 py-2 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1 flex-1">
                      {resume.title}
                    </h3>
                    <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${STATUS_BADGE[resume.status] || STATUS_BADGE.draft}`}>
                      {resume.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{resume.personalInfo?.fullName}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${TEMPLATE_STYLES[resume.template]?.badge || "bg-gray-100 text-gray-600"}`}>
                      {resume.template}
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{fmt(resume.updatedAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(resume)}
                    className="flex-1 py-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDownload(resume._id, resume.title)}
                    disabled={downloading === resume._id}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    {downloading === resume._id ? <Spinner /> : "⬇️ PDF"}
                  </button>

                  <button
                    onClick={() => handleDelete(resume._id, resume.title)}
                    disabled={deleting === resume._id}
                    className="w-9 h-9 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors disabled:opacity-50 shrink-0"
                  >
                    {deleting === resume._id ? <Spinner /> : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Templates section ── */}
        <div className="mt-12 sm:mt-16 fade-up">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900">
                Choose a Template
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                Pick a style and start building instantly
              </p>
            </div>
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100 hidden sm:block">
              All Free ✨
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { key: "modern", label: "Modern", tag: "Most Popular", tagColor: "bg-blue-100 text-blue-700", desc: "Bold sidebar, skill chips, clean layout", img: "https://i.pinimg.com/1200x/a9/5c/67/a95c67b6235b1a0af378281136e1ddef.jpg" },
              { key: "minimal", label: "Minimal", tag: "Elegant", tagColor: "bg-green-100 text-green-700", desc: "Clean structure, ATS-friendly, professional", img: "https://i.pinimg.com/1200x/7e/aa/d1/7eaad1691e3897a5a36640466909cc74.jpg" },
              { key: "professional", label: "Professional", tag: "ATS Ready", tagColor: "bg-gray-100 text-gray-600", desc: "Minimal two-column, elegant whitespace", img: "https://i.pinimg.com/1200x/fe/7f/f7/fe7ff76cc77473a976ecc25a3523f76a.jpg" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  useResumeStore.getState().clearResume?.()
                  useResumeStore.setState({ template: t.key })
                  navigate("/builder")
                }}
                className="group text-left bg-white border border-gray-200 hover:border-green-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* ── Full resume image — no fixed height, shows completely ── */}
                <div className="relative overflow-hidden bg-gray-50">
                  <img
                    src={t.img}
                    alt={t.label}
                    className="w-full h-auto object-contain"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-xl shadow-lg">
                      Use Template →
                    </span>
                  </div>
                </div>

                {/* ── Footer ── */}
                <div className="px-4 py-3 flex items-center justify-between gap-2 border-t border-gray-100">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{t.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">{t.desc}</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap ${t.tagColor}`}>
                    {t.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard