function Score({ label, value }) {
  return (
    <div className="score-mini">
      <span>{label}</span>
      <strong>{value}%</strong>
      <div className="meter"><i style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function AnalysisResult({ data }) {
  if (!data) return null;
  return (
    <section className="analysis-result">
      <div className="result-head">
        <div>
          <p className="eyebrow">AI ANALYSIS COMPLETE</p>
          <h2>{data.candidateName || "Resume Candidate"}</h2>
          <p>{data.candidateRole} · {data.candidateExp}</p>
        </div>
        <div className="big-score"><strong>{data.overallScore}</strong><span>/100</span><small>Resume Score</small></div>
      </div>

      <div className="score-grid">
        <Score label="ATS Compatibility" value={data.atsScore} />
        <Score label="Skills Match" value={data.skillsScore} />
        <Score label="Experience" value={data.experienceScore} />
        <Score label="Education" value={data.educationScore} />
        <Score label="Action Verbs" value={data.actionVerbScore} />
      </div>

      <div className="result-grid">
        <div className="panel">
          <h3>Detected Skills</h3>
          <div className="chips">{data.techSkills?.map((s) => <span key={s} className="chip">{s}</span>)}</div>
        </div>
        <div className="panel">
          <h3>Missing Skills</h3>
          <div className="chips">{data.missingSkills?.map((s) => <span key={s} className="chip missing">{s}</span>)}</div>
        </div>
        <div className="panel">
          <h3>Strengths</h3>
          <ul>{data.strengths?.map((s) => <li key={s}>✓ {s}</li>)}</ul>
        </div>
        <div className="panel">
          <h3>Improvement Suggestions</h3>
          <ul>{data.suggestions?.map((s) => <li key={s}>→ {s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
