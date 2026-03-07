# 🤖 AI Resume Analyzer & Builder

> **Full-stack AI-powered resume platform — build, preview, analyze and download professional resumes.**

---

## 🌐 Live Demo

### 👉 [https://ai-resume-analyzer-and-builder.vercel.app/](https://ai-resume-analyzer-and-builder.vercel.app/)

| Service | Link |
|---------|------|
| 🌍 Frontend | [ai-resume-analyzer-and-builder.vercel.app](https://ai-resume-analyzer-and-builder.vercel.app/) |
| 🔗 GitHub | [github.com/harshit4512/AI-resume-analyzer-and-builder](https://github.com/harshit4512/AI-resume-analyzer-and-builder/tree/main) |

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**AI & PDF**

![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge&logo=groq&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)

**Deployment**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Resume Templates](#-resume-templates)
- [AI Analysis](#-ai-resume-analysis)
- [PDF Generation](#-pdf-generation)
- [Author](#-author)

---

## 📌 Features

### 🔐 Authentication & Security
- JWT-based authentication via HTTP-only cookies
- Secure register & login flow
- Protected routes — all resume data scoped per user
- Password hashing with bcrypt
- Validation middleware on all inputs

### 📝 Resume Builder
- Live side-by-side preview as you type
- 3 professional templates: **Modern**, **Minimal**, **Professional**
- Sections: Personal Info, Summary, Experience, Education, Skills, Projects, Links
- Save as draft or mark as final
- Update existing resumes anytime
- Multiple resumes per account
- Mobile-friendly tab switcher (Edit / Preview)

### 🤖 AI Resume Analyzer
- Upload any PDF resume (PDF-only, single file)
- Powered by **Groq LLaMA 3.3-70b-versatile**
- ATS score out of 100 with color-coded gauge
- Identifies strengths, weaknesses, and actionable suggestions
- PDF text extraction via **pdfjs-dist**
- 3000-word content limit with validation

### ⬇️ PDF Download
- Downloaded PDF looks **identical to the live preview**
- Powered by **Puppeteer** headless Chromium
- `printBackground: true` — dark sidebars and colors fully preserved
- Available from both the Builder page and the Dashboard
- A4 format, zero margin, pixel-perfect output

### 📊 Resume Dashboard
- View all saved resumes in a responsive card grid
- Template thumbnail previews per resume
- Edit, download PDF, or delete any resume
- Resume status badges (draft / final)
- Create new resume directly from dashboard

---

## 🧠 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│              React + Vite Frontend (Vercel)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST + JWT Cookie
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│             Node.js + Express Backend (Render)                   │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐    │
│  │ Auth Service│  │Resume Service│  │     AI Service       │    │
│  │ JWT + bcrypt│  │  CRUD + PDF  │  │  Groq LLaMA 3.3-70b │    │
│  └─────────────┘  └──────────────┘  └─────────────────────┘    │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              PDF Generator (Puppeteer)                     │  │
│  │    renderTemplate.js → HTML String → Chromium → PDF       │  │
│  └───────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │    MongoDB      │
                   │  Atlas Cloud    │
                   │  Users/Resumes  │
                   └─────────────────┘

Data Flow:
1. User registers/logs in  →  JWT issued via HTTP-only cookie
2. User builds resume      →  Saved to MongoDB
3. User downloads PDF      →  Puppeteer renders HTML template → PDF returned
4. User uploads PDF        →  pdfjs extracts text → Groq analyzes → ATS score returned
```

---

## 📂 Project Structure

```
AI-Resume-Analyzer-Builder/
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   ├── images/
│   │   │   └── react.svg
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx                   # Reusable button component
│   │   │   │   ├── Input.jsx                    # Reusable input component
│   │   │   │   ├── Loader.jsx                   # Loading spinner
│   │   │   │   ├── Modal.jsx                    # Modal component
│   │   │   │   └── Textarea.jsx                 # Reusable textarea
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx                   # Landing page navbar
│   │   │   │   ├── ProtectedRoute.jsx           # Auth route guard
│   │   │   │   └── Sidebar.jsx                  # Sidebar layout
│   │   │   │
│   │   │   └── resume-builder/
│   │   │       ├── forms/
│   │   │       │   ├── EducationForm.jsx         # Education section form
│   │   │       │   ├── ExperienceForm.jsx        # Experience section form
│   │   │       │   ├── PersonalInfoForm.jsx      # Personal info form
│   │   │       │   ├── ProjectsForm.jsx          # Projects section form
│   │   │       │   ├── SkillsForm.jsx            # Skills section form
│   │   │       │   └── SummaryForm.jsx           # Summary section form
│   │   │       │
│   │   │       ├── templates/
│   │   │       │   ├── MinimalTemplate.jsx       # Gray bg, two-column layout
│   │   │       │   ├── ModernTemplate.jsx        # Dark sidebar template
│   │   │       │   ├── ProfessionalTemplate.jsx  # Clean centered layout
│   │   │       │   └── Templatehelpers.jsx       # Shared formatDate, SkillBadge
│   │   │       │
│   │   │       ├── BuilderLayout.jsx             # Builder page layout + save/download
│   │   │       ├── Resumepreview.jsx             # Live template preview
│   │   │       └── SectionTabs.jsx              # Tab switcher for form sections
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js                        # Auth custom hook
│   │   │   ├── useResume.js                      # Resume custom hook
│   │   │   └── useTheme.js                       # Theme custom hook
│   │   │
│   │   ├── pages/
│   │   │   ├── Analysisresult.jsx                # ATS score results display
│   │   │   ├── Builder.jsx                       # Resume builder page
│   │   │   ├── Dashboard.jsx                     # Resume management dashboard
│   │   │   ├── Landing.jsx                       # Home / landing page
│   │   │   ├── Login.jsx                         # Login page
│   │   │   ├── Logout.jsx                        # Logout handler
│   │   │   ├── Notfound.jsx                      # 404 page
│   │   │   ├── Register.jsx                      # Registration page
│   │   │   ├── Resumeanalyzer.jsx                # AI analyzer upload page
│   │   │   └── TemplatesPage.jsx                 # Template selection page
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx                     # All app routes + protected routes
│   │   │
│   │   ├── services/
│   │   │   ├── ai.service.js                     # AI analyzer API calls
│   │   │   ├── api.js                            # Axios instance + base URL
│   │   │   ├── auth.service.js                   # Auth API calls
│   │   │   └── resume.service.js                 # Resume CRUD + PDF download
│   │   │
│   │   ├── store/
│   │   │   ├── authStore.js                      # Zustand auth state
│   │   │   └── resumeStore.js                    # Zustand resume state
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js                      # App-wide constants
│   │   │   └── formatDate.js                     # Date formatting utility
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx                               # Root component
│   │   ├── index.css
│   │   └── main.jsx                              # Vite entry point
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vercel.json                               # Vercel SPA routing config
│   └── vite.config.js
│
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── ai.controller.js                  # AI analysis endpoint logic
│       │   ├── auth.controller.js                # Register, login, logout logic
│       │   └── resume.controller.js              # Resume CRUD + PDF download
│       │
│       ├── db/
│       │   └── db.js                             # MongoDB connection
│       │
│       ├── middlewares/
│       │   ├── auth.middleware.js                # JWT verification middleware
│       │   └── validate.middleware.js            # Request validation middleware
│       │
│       ├── models/
│       │   ├── resume.model.js                   # Resume Mongoose schema
│       │   └── user.model.js                     # User Mongoose schema
│       │
│       ├── routes/
│       │   ├── ai.routes.js                      # /ai/* routes
│       │   ├── auth.routes.js                    # /auth/* routes
│       │   └── resume.routes.js                  # /resume/* routes
│       │
│       ├── services/
│       │   ├── auth.service.js                   # Auth business logic
│       │   └── resume.service.js                 # Resume business logic
│       │
│       ├── utils/
│       │   ├── generatePDF.js                    # Puppeteer PDF generator
│       │   ├── generateToken.js                  # JWT token generator
│       │   └── renderTemplate.js                 # HTML template renderer (all 3 templates)
│       │
│       ├── validators/
│       │   └── resume.validator.js               # Resume input validators
│       │
│       └── app.js                                # Express app setup + middleware
│
├── .gitignore
├── package.json
├── server.js                                     # Server entry point
└── README.md
```

---

## ▶️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Groq API key — [get one free at console.groq.com](https://console.groq.com)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/harshit4512/AI-resume-analyzer-and-builder.git
cd AI-resume-analyzer-and-builder
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` in `/frontend`:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

### 4️⃣ Open the App

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## 🔐 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `GROQ_API_KEY` | Groq API key for LLaMA 3.3 |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend URL (for CORS) |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL |

---

## 🔑 API Reference

### Auth — `/auth`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login + set JWT cookie | ❌ |
| POST | `/auth/logout` | Clear session cookie | ✅ |

**Register body:**
```json
{
  "username": "harshit",
  "email": "harshit@example.com",
  "password": "SecurePass123"
}
```

**Login body:**
```json
{
  "email": "harshit@example.com",
  "password": "SecurePass123"
}
```

**Login response:**
```json
{
  "success": true,
  "user": { "username": "harshit", "email": "harshit@example.com" }
}
```

---

### Resume — `/resume`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/resume` | Get all user resumes | ✅ |
| POST | `/resume` | Create new resume | ✅ |
| PUT | `/resume/:id` | Update resume | ✅ |
| DELETE | `/resume/:id` | Delete resume | ✅ |
| GET | `/resume/:id/pdf` | Download resume as PDF | ✅ |

**Create resume body:**
```json
{
  "title": "My Resume",
  "template": "modern",
  "status": "draft",
  "personalInfo": {
    "fullName": "Harshit Purwar",
    "email": "harshit@example.com",
    "phone": "+91 9876543210",
    "address": "India",
    "portfolio": "harshit.dev"
  },
  "summary": "Full-stack developer...",
  "links": { "github": "github.com/harshit4512", "linkedin": "...", "leetcode": "..." },
  "skills": {
    "technical": ["React", "Node.js"],
    "tools": ["Git", "Docker"],
    "coreSubjects": ["DSA", "DBMS"],
    "communication": ["Team Leadership"]
  },
  "education": [{ "institution": "ABC University", "degree": "B.Tech CSE", "startDate": "2020-08", "endDate": "2024-05" }],
  "experience": [{ "company": "XYZ Corp", "role": "SDE Intern", "startDate": "2023-06", "endDate": "2023-08", "description": "Built REST APIs..." }],
  "projects": [{ "title": "AI Resume Builder", "techStack": ["React", "Node.js"], "description": "...", "githubLink": "...", "liveLink": "..." }]
}
```

---

### AI Analyzer — `/ai`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/ai/analyze` | Upload PDF → ATS score + analysis | ✅ |

**Request:** `multipart/form-data` with field `resume` (PDF file)

**Response:**
```json
{
  "score": 78,
  "strengths": ["Strong technical skills section", "Clear project descriptions"],
  "weaknesses": ["Missing quantifiable achievements", "No summary section"],
  "suggestions": ["Add metrics to experience", "Include a professional summary"]
}
```

---

## 🎨 Resume Templates

### Modern
- Dark `#2b2b2b` left sidebar (36% width) + white right content
- Georgia serif font throughout
- Skills displayed as dark chips
- Two-column grid for Experience, Education, Projects

### Minimal
- Light gray `#f3f4f6` background
- Large stacked uppercase name header
- Two-column layout: sidebar (Contact, Education, Skills) | main (About, Experience, Projects)
- Vertical divider line between columns

### Professional
- Clean centered name + contact header
- Gray `#f3f4f6` section heading bars
- Single-column content layout
- Helvetica Neue font

> All three templates use **inline styles only** — ensuring the live browser preview and downloaded PDF are **pixel-perfect identical**.

---

## 🤖 AI Resume Analysis

```
User uploads PDF resume
        ↓
Multer receives file → pdfjs-dist extracts raw text
        ↓
Text trimmed to max 3000 words + validated
        ↓
Sent to Groq API (LLaMA 3.3-70b-versatile, max_tokens: 1024)
        ↓
AI returns structured JSON response
        ↓
Score + strengths + weaknesses + suggestions displayed
```

**ATS Scoring Guide:**
| Score | Meaning |
|-------|---------|
| 85–100 | Excellent — ready to send |
| 65–84 | Good — minor improvements needed |
| 50–64 | Average — significant gaps |
| Below 50 | Needs major rework |

---

## ⬇️ PDF Generation

```
User clicks Download PDF
        ↓
Frontend calls GET /resume/:id/pdf
        ↓
Backend fetches resume from MongoDB
        ↓
renderTemplate.js builds full HTML string
(Modern / Minimal / Professional — matching React template exactly)
        ↓
generatePDF.js launches Puppeteer (headless Chromium via @sparticuz/chromium)
        ↓
page.setContent(html) → page.pdf({ format: 'A4', printBackground: true })
        ↓
PDF buffer streamed back → file downloaded in browser
```

> `printBackground: true` is essential — without it, dark sidebar backgrounds are stripped from the PDF output.

---

## 🎯 Why This Project?

✅ **Real-world AI integration** — Groq LLaMA 3.3 for instant, accurate ATS resume scoring  
✅ **Production PDF generation** — Puppeteer renders templates identically to browser preview  
✅ **Clean architecture** — Separated controllers, services, routes, validators, utils  
✅ **Responsive design** — Works on mobile, tablet, and desktop  
✅ **JWT security** — HTTP-only cookies, protected routes, per-user data isolation  
✅ **Deployed & live** — Vercel (frontend) + Render (backend) + MongoDB Atlas  

---

## ⭐ Future Improvements

- [ ] More resume templates (4, 5, 6+)
- [ ] AI-powered content suggestions while building
- [ ] Cover letter generator using Groq AI
- [ ] Resume sharing via public link
- [ ] Resume version history
- [ ] Export to DOCX format
- [ ] LinkedIn profile import
- [ ] Job description matching — paste a JD, get a tailored ATS score

---

## 🧑‍💻 Author

**Harshit Purwar**  
Full-Stack Developer 

Skills: React | Node.js | Express | MongoDB | Groq AI | Puppeteer | Tailwind CSS | JavaScript
Focus: AI-powered web applications and full-stack development

[![GitHub](https://img.shields.io/badge/GitHub-harshit4512-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/harshit4512)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-25A84B?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-resume-analyzer-and-builder.vercel.app/)

---

> ⭐ If you found this project useful, please consider giving it a star on GitHub!
