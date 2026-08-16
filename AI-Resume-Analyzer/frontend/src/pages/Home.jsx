import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill">✦ AI-POWERED CAREER INTELLIGENCE</span>
          <h1>Turn your resume into your <em>next opportunity.</em></h1>
          <p>Analyze your resume, discover missing skills, improve your ATS score, and find job roles that match your profile.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/analyzer">Analyze My Resume →</Link>
            <Link className="secondary-btn" to="/jobs">Explore Jobs</Link>
          </div>
          <div className="stats">
            <div><strong>15+</strong><span>Job roles</span></div>
            <div><strong>5</strong><span>Resume metrics</span></div>
            <div><strong>AI</strong><span>Skill insights</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orb orb-a" /><div className="orb orb-b" />
          <div className="resume-card">
            <div className="mini-header"><span>RESUME ANALYSIS</span><b>AI</b></div>
            <div className="profile-line"><div className="avatar">AM</div><div><strong>Candidate Profile</strong><small>Full Stack Developer</small></div></div>
            <div className="score-ring"><strong>88</strong><span>/100</span></div>
            <div className="mini-meters"><i /><i /><i /><i /></div>
            <div className="mini-chips"><span>React</span><span>Node.js</span><span>MongoDB</span><span>Git</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading"><span className="eyebrow">HOW IT WORKS</span><h2>From resume to recommendation in minutes.</h2></div>
        <div className="feature-grid">
          <div className="feature"><span>01</span><h3>Upload Resume</h3><p>Upload your PDF resume securely for analysis.</p></div>
          <div className="feature"><span>02</span><h3>AI Analysis</h3><p>Get ATS, skills, education and experience insights.</p></div>
          <div className="feature"><span>03</span><h3>Find Opportunities</h3><p>Discover roles ranked by your skill match percentage.</p></div>
        </div>
      </section>
    </main>
  );
}
