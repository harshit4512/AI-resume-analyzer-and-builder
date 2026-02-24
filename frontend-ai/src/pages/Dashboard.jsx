import { useEffect, useState } from "react"
import { getResumes } from "../services/resume.service"
import { Link } from "react-router-dom"

import { downloadResumePDF } from "../services/resume.service.js"

const Dashboard = () => {
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getResumes()
      setResumes(res.data.resumes)
    }
    fetchData()
  }, [])
  
  const handleDownload = async (id) => {
  try {
    const response = await downloadResumePDF(id)

    const blob = new Blob([response.data], {
      type: "application/pdf",
    })

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "resume.pdf")
    document.body.appendChild(link)
    link.click()
  } catch (error) {
    console.error(error)
    alert("Download failed ❌")
  }
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
        <div
          key={resume._id}
          className="p-4 border rounded mb-3"
        >
          <h2 className="font-semibold">{resume.title}</h2>

          <button
      onClick={() => handleDownload(resume._id)}
      className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
    >
      Download PDF
    </button>
        </div>
      ))}
    </div>
  )
}

export default Dashboard