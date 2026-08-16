export default function JobRecommendations({ jobs = [] }) {
  return (
    <div className="jobs-grid">
      {jobs.map((job) => (
        <article className="job-card" key={job.id || job.title}>
          <div className="job-top">
            <span className="tag">{job.category}</span>
            <b>{job.matchScore}%</b>
          </div>
          <h3>{job.title}</h3>
          <p className="muted">{job.company} · {job.location}</p>
          <p>{job.description}</p>
          <div className="chips">
            {job.matchingSkills?.slice(0, 4).map((s) => <span className="chip good" key={s}>✓ {s}</span>)}
            {job.missingSkills?.slice(0, 2).map((s) => <span className="chip missing" key={s}>{s}</span>)}
          </div>
          <div className="job-footer"><span>{job.salary}</span><span>{job.experience}</span></div>
        </article>
      ))}
    </div>
  );
}
