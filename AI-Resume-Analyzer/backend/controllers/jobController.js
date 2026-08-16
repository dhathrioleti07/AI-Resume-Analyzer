const JOBS = require("../services/jobsData");

function matchJob(job, userSkills = []) {
  const normalized = userSkills.map((s) => s.toLowerCase());
  const matchingSkills = job.skills.filter((skill) =>
    normalized.some((userSkill) =>
      userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
    )
  );
  const missingSkills = job.skills.filter((skill) => !matchingSkills.includes(skill));
  const raw = Math.round((matchingSkills.length / Math.max(job.skills.length, 1)) * 100);
  return { ...job, matchScore: Math.min(98, Math.max(45, raw)), matchingSkills, missingSkills };
}

async function getJobs(req, res) {
  res.json(JOBS);
}

async function getRecommendations(req, res) {
  const skills = Array.isArray(req.body?.skills) ? req.body.skills : [];
  const recommendations = JOBS
    .map((job) => matchJob(job, skills))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  res.json({ recommendations });
}

module.exports = { getJobs, getRecommendations };
