import { Link } from "react-router-dom";

export default function Dashboard() {
  const analysis = JSON.parse(localStorage.getItem("resumeai_last_analysis") || "null");
  const jobs = JSON.parse(localStorage.getItem("resumeai_jobs") || "[]");
  const user = JSON.parse(localStorage.getItem("resumeai_user") || "null");

  return <main className="page">
    <div className="page-title"><span className="eyebrow">YOUR CAREER DASHBOARD</span><h1>{user?.name ? `Hello, ${user.name}` : "Resume dashboard"}</h1><p>Track your latest resume score, skills and job opportunities.</p></div>
    {!analysis ? <div className="empty panel"><h2>No analysis yet</h2><p>Upload your resume to populate your dashboard.</p><Link className="primary-btn" to="/analyzer">Analyze Resume</Link></div> :
      <>
        <div className="dashboard-cards">
          <div className="metric"><span>Resume Score</span><strong>{analysis.overallScore}</strong><small>/100</small></div>
          <div className="metric"><span>ATS Score</span><strong>{analysis.atsScore}%</strong></div>
          <div className="metric"><span>Skills Detected</span><strong>{analysis.techSkills?.length || 0}</strong></div>
          <div className="metric"><span>Job Matches</span><strong>{jobs.length}</strong></div>
        </div>
        <div className="dashboard-grid">
          <div className="panel"><h2>Top Skills</h2><div className="chips">{analysis.techSkills?.map(s=><span className="chip" key={s}>{s}</span>)}</div></div>
          <div className="panel"><h2>Priority Improvements</h2><ul>{analysis.suggestions?.map(s=><li key={s}>→ {s}</li>)}</ul></div>
        </div>
        <div className="panel"><div className="panel-head"><h2>Top Job Matches</h2><Link to="/jobs">View all →</Link></div><div className="mini-job-list">{jobs.slice(0,3).map(j=><div key={j.id} className="mini-job"><span><b>{j.title}</b><small>{j.company}</small></span><strong>{j.matchScore}%</strong></div>)}</div></div>
      </>
    }
  </main>;
}
