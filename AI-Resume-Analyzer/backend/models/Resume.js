const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    overallScore: Number,
    atsScore: Number,
    skillsScore: Number,
    experienceScore: Number,
    educationScore: Number,
    actionVerbScore: Number,
    candidateName: String,
    candidateRole: String,
    skills: [String],
    missingSkills: [String],
    strengths: [String],
    suggestions: [String],
    education: String,
    experience: String,
    projects: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
