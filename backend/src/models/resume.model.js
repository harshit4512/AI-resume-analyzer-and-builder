import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      default: "modern",
    },

    status: {
      type: String,
      enum: ["draft", "final"],
      default: "draft",
    },

    personalInfo: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: String,
      address: String,
      portfolio: String,
    },

    summary: String,

    links: {
      github: String,
      linkedin: String,
      leetcode: String,
    },

    skills: {
      technical: [String],
      coreSubjects: [String],
      communication: [String],
      tools: [String],
    },

    projects: [
      {
        title: String,
        techStack: [String],
        description: String,
        githubLink: String,
        liveLink: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
      },
    ],

   
  },
  { timestamps: true }
)

const Resume = mongoose.model("Resume", resumeSchema)

export default Resume