import { useEffect, useState } from "react";
import JobRecommendations from "../components/JobRecommendations";
import { getJobs, getRecommendations } from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [min, setMin] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("resumeai_jobs");
    if (saved) setJobs(JSON.parse(saved));
    else getJobs().then(setJobs).catch(() => {});
  }, []);

  const search = async () => {
    const analysis = JSON.parse(localStorage.getItem("resumeai_last_analysis") || "null");
    if (analysis?.techSkills) {
      const data = await getRecommendations([...analysis.techSkills, ...(analysis.softSkills || [])]);
      setJobs(data);
      localStorage.setItem("resumeai_jobs", JSON.stringify(data));
    }
  };

  const filtered = jobs.filter((job) =>
    job.matchScore >= min &&
    `${job.title} ${job.company} ${job.category} ${job.skills.join(" ")}`
      .toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="page">
      <div className="page-title"><span className="eyebrow">CAREER MATCHING</span><h1>Recommended jobs</h1><p>Explore roles ranked by how closely they match your resume skills.</p></div>
      <div className="filters">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search role, company or skill..." />
        <select value={min} onChange={(e) => setMin(Number(e.target.value))}>
          <option value="0">All matches</option><option value="60">60%+ match</option><option value="75">75%+ match</option><option value="85">85%+ match</option>
        </select>
        <button className="primary-btn" onClick={search}>Recalculate Match</button>
      </div>
      <JobRecommendations jobs={filtered} />
    </main>
  );
}
