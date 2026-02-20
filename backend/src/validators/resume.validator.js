import Joi from "joi";

export const resumeValidationSchema = Joi.object({

  title: Joi.string().min(2).max(100).required(),

  template: Joi.string()
    .valid("modern", "minimal", "professional")
    .optional(),

  status: Joi.string()
    .valid("draft", "final")
    .optional(),

  personalInfo: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
    address: Joi.string().allow("").optional(),
    portfolio: Joi.string().uri().allow("").optional(),
  }).required(),

  summary: Joi.string().allow("").optional(),

  links: Joi.object({
    github: Joi.string().uri().allow("").optional(),
    linkedin: Joi.string().uri().allow("").optional(),
    leetcode: Joi.string().uri().allow("").optional(),
  }).optional(),

  skills: Joi.object({
    technical: Joi.array().items(Joi.string()).optional(),
    coreSubjects: Joi.array().items(Joi.string()).optional(),
    communication: Joi.array().items(Joi.string()).optional(),
    tools: Joi.array().items(Joi.string()).optional(),
  }).optional(),

  projects: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      techStack: Joi.array().items(Joi.string()).optional(),
      description: Joi.string().allow("").optional(),
      githubLink: Joi.string().uri().allow("").optional(),
      liveLink: Joi.string().uri().allow("").optional(),
    })
  ).optional(),

  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      role: Joi.string().required(),
      startDate: Joi.string().optional(),
      endDate: Joi.string().optional(),
      description: Joi.string().allow("").optional(),
    })
  ).optional(),

  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      degree: Joi.string().required(),
      startDate: Joi.string().optional(),
      endDate: Joi.string().optional(),
    })
  ).optional(),

});