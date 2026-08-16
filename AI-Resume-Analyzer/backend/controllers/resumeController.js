const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/resumeAnalyzer");

async function analyzeUploadedResume(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "Please select a PDF resume." });

    let text = "";
    try {
      const parsed = await pdfParse(req.file.buffer);
      text = parsed.text || "";
    } catch {
      return res.status(422).json({ message: "We could not read this PDF. Please upload a valid text-based PDF." });
    }

    if (!text.trim()) {
      return res.status(422).json({ message: "No readable text was found in the resume." });
    }

    const analysis = analyzeResume(text);

    if (req.user?.id) {
      try {
        await Resume.create({
          user: req.user.id,
          fileName: req.file.originalname,
          overallScore: analysis.overallScore,
          atsScore: analysis.atsScore,
          skillsScore: analysis.skillsScore,
          experienceScore: analysis.experienceScore,
          educationScore: analysis.educationScore,
          actionVerbScore: analysis.actionVerbScore,
          candidateName: analysis.candidateName,
          candidateRole: analysis.candidateRole,
          skills: analysis.techSkills,
          missingSkills: analysis.missingSkills,
          strengths: analysis.strengths,
          suggestions: analysis.suggestions,
          education: analysis.education,
          experience: analysis.experience,
          projects: analysis.projects
        });
      } catch {
        // Analysis should still succeed if the database is not configured.
      }
    }

    res.json({ message: "Resume analysis completed.", analysis });
  } catch {
    res.status(500).json({ message: "Resume analysis failed. Please try again." });
  }
}

async function history(req, res) {
  try {
    const items = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    res.json(items);
  } catch {
    res.status(500).json({ message: "Unable to load resume history." });
  }
}

module.exports = { analyzeUploadedResume, history };
