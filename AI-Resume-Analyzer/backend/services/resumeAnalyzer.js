const SKILL_LIBRARY = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB",
  "SQL", "Python", "Java", "C++", "HTML", "CSS", "Tailwind CSS", "Redux",
  "Git", "GitHub", "REST API", "Docker", "AWS", "Azure", "Firebase",
  "Machine Learning", "Data Science", "Pandas", "NumPy", "TensorFlow",
  "PyTorch", "Figma", "UI/UX", "Communication", "Leadership", "Problem Solving",
  "Teamwork", "Agile", "Jira"
];

const CORE_SKILLS = ["JavaScript", "React", "Node.js", "Git", "SQL", "Python"];

function contains(text, skill) {
  const normalized = text.toLowerCase();
  return normalized.includes(skill.toLowerCase());
}

function unique(items) {
  return [...new Set(items)];
}

function analyzeResume(text = "") {
  const clean = text.replace(/\s+/g, " ").trim();
  const skills = unique(SKILL_LIBRARY.filter((skill) => contains(clean, skill)));

  const missingSkills = CORE_SKILLS.filter((skill) => !skills.includes(skill));
  const technicalCount = skills.filter((skill) =>
    !["Communication", "Leadership", "Problem Solving", "Teamwork", "Agile"].includes(skill)
  ).length;

  const atsScore = Math.min(96, 55 + Math.min(35, technicalCount * 5) + (clean.length > 800 ? 6 : 0));
  const skillsScore = Math.min(98, 45 + technicalCount * 7);
  const experienceScore = /(experience|developer|engineer|intern|worked|years)/i.test(clean) ? 82 : 48;
  const educationScore = /(education|bachelor|master|degree|b\.tech|bsc|m\.tech|university|college)/i.test(clean) ? 90 : 50;
  const actionVerbScore = /(developed|built|created|designed|implemented|led|optimized|managed|improved)/i.test(clean) ? 88 : 62;

  const overallScore = Math.round(
    atsScore * 0.25 +
    skillsScore * 0.25 +
    experienceScore * 0.2 +
    educationScore * 0.15 +
    actionVerbScore * 0.15
  );

  const candidateName =
    clean.split(/\n/)[0]?.trim() ||
    clean.match(/^[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+){0,2}/)?.[0] ||
    "Resume Candidate";

  const role = /(frontend|react)/i.test(clean)
    ? "Frontend / React Developer"
    : /(data|machine learning|python)/i.test(clean)
      ? "Data / ML Candidate"
      : /(backend|node|express)/i.test(clean)
        ? "Backend Developer"
        : "Software Developer";

  const strengths = [];
  if (skills.length >= 5) strengths.push("Good technical skill coverage");
  if (/project/i.test(clean)) strengths.push("Projects are represented in the resume");
  if (/experience|intern/i.test(clean)) strengths.push("Practical experience is visible");
  if (/education|degree|university|college/i.test(clean)) strengths.push("Education details are present");
  if (/github|linkedin/i.test(clean)) strengths.push("Professional profile links are included");
  if (!strengths.length) strengths.push("Resume provides a useful starting point for analysis");

  const suggestions = [];
  if (missingSkills.length) suggestions.push(`Consider learning: ${missingSkills.join(", ")}`);
  if (clean.length < 700) suggestions.push("Add measurable project and experience details to improve ATS relevance.");
  if (!/quantif|%|\d+\s*(users|projects|months|years)/i.test(clean)) {
    suggestions.push("Add measurable achievements such as percentages, users, time saved, or performance improvements.");
  }
  suggestions.push("Use strong action verbs and tailor keywords to each target job.");

  return {
    candidateName,
    candidateRole: role,
    candidateExp: /(3\+|3 years|4 years|5 years)/i.test(clean) ? "3 - 5 Years" : "Entry / Early Career",
    overallScore,
    atsScore,
    skillsScore,
    experienceScore,
    educationScore,
    actionVerbScore,
    techSkills: skills.filter((s) => !["Communication", "Leadership", "Problem Solving", "Teamwork", "Agile"].includes(s)),
    softSkills: skills.filter((s) => ["Communication", "Leadership", "Problem Solving", "Teamwork", "Agile"].includes(s)),
    missingSkills,
    strengths,
    suggestions,
    education: /(education|bachelor|master|degree|b\.tech|bsc|m\.tech|university|college)/i.test(clean)
      ? "Education details detected from the uploaded resume."
      : "No clear education section detected.",
    experience: /(experience|developer|engineer|intern|worked)/i.test(clean)
      ? "Experience-related content detected from the uploaded resume."
      : "No clear experience section detected.",
    projects: /project/i.test(clean)
      ? ["Project details detected from the resume."]
      : ["Add 1–3 relevant projects with technologies and measurable outcomes."]
  };
}

module.exports = { analyzeResume, SKILL_LIBRARY };
