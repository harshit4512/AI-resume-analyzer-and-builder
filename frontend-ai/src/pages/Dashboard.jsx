// import { useEffect, useState } from "react"
// import { getResumes } from "../services/resume.service"
// import { Link } from "react-router-dom"

// import { downloadResumePDF } from "../services/resume.service.js"

// const Dashboard = () => {
//   const [resumes, setResumes] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getResumes()
//       setResumes(res.data.resumes)
//     }
//     fetchData()
//   }, [])
  
//   const handleDownload = async (id) => {
//   try {
//     const response = await downloadResumePDF(id)

//     const blob = new Blob([response.data], {
//       type: "application/pdf",
//     })

//     const url = window.URL.createObjectURL(blob)

//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", "resume.pdf")
//     document.body.appendChild(link)
//     link.click()
//   } 
//   catch (error) {
//     console.error(error)
//     alert("Download failed ❌")

//   }
// }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Your Resumes</h1>

//       <Link to="/builder">
//         <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded">
//           Create Resume
//         </button>
//       </Link>

//       {resumes.map((resume) => (
//         <div
//           key={resume._id}
//           className="p-4 border rounded mb-3"
//         >
//           <h2 className="font-semibold">{resume.title}</h2>

//           <button
//       onClick={() => handleDownload(resume._id)}
//       className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//     >
//       Download PDF
//     </button>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Dashboard


import { useEffect, useState } from "react"
import { getResumes, downloadResumePDF, deleteResume } from "../services/resume.service"
import { Link, useNavigate } from "react-router-dom"
import { useResumeStore } from "../store/resumeStore.js"

const Dashboard = () => {
  const [resumes, setResumes] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [downloading, setDownloading] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getResumes()
      setResumes(res.data.resumes)
    }
    fetchData()
  }, [])

  // ── Download PDF ──────────────────────────────────────────────────────────
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
    } catch (error) {
      console.error(error)
      alert("Download failed ❌")
    } finally {
      setDownloading(null)
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await deleteResume(id)
      setResumes((prev) => prev.filter((r) => r._id !== id))
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Delete failed ❌")
    } finally {
      setDeleting(null)
    }
  }

  // ── Edit — load resume into store then go to /builder ────────────────────
  const handleEdit = (resume) => {
    // Hydrate the store with this resume's data
    useResumeStore.setState({
      _id:         resume._id,
      title:       resume.title,
      template:    resume.template,
      status:      resume.status,
      personalInfo: resume.personalInfo,
      summary:     resume.summary || "",
      links:       resume.links   || { github: "", linkedin: "", leetcode: "" },
      skills:      resume.skills  || { technical: [], coreSubjects: [], communication: [], tools: [] },
      education:   resume.education  || [],
      experience:  resume.experience || [],
      projects:    resume.projects   || [],
    })
    navigate("/builder")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Resumes</h1>

      <Link to="/builder">
        <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded">
          Create Resume
        </button>
      </Link>

      {resumes.map((resume) => (
        <div key={resume._id} className="p-4 border rounded mb-3 flex items-center justify-between">

          <h2 className="font-semibold">{resume.title}</h2>

          <div className="flex items-center gap-2">
            {/* Download */}
            <button
              onClick={() => handleDownload(resume._id, resume.title)}
              disabled={downloading === resume._id}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded disabled:opacity-50"
            >
              {downloading === resume._id ? "..." : "Download PDF"}
            </button>

            {/* Edit / Update */}
            <button
              onClick={() => handleEdit(resume)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Edit
            </button>

            {/* Delete */}
            <button
              onClick={() => handleDelete(resume._id, resume.title)}
              disabled={deleting === resume._id}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded disabled:opacity-50"
            >
              {deleting === resume._id ? "..." : "Delete"}
            </button>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Dashboard