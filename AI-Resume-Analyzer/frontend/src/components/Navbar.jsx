import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("resumeai_token"));

  const logout = () => {
    localStorage.removeItem("resumeai_token");
    localStorage.removeItem("resumeai_user");
    navigate("/");
  };

  const active = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">✦</span>
        <span>Resume<span>AI</span></span>
      </Link>
      <nav>
        <Link className={active("/")} to="/">Home</Link>
        <Link className={active("/analyzer")} to="/analyzer">Analyzer</Link>
        <Link className={active("/jobs")} to="/jobs">Jobs</Link>
        <Link className={active("/dashboard")} to="/dashboard">Dashboard</Link>
      </nav>
      <div className="nav-actions">
        {loggedIn ? (
          <button className="ghost-btn" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link className="ghost-btn" to="/login">Login</Link>
            <Link className="primary-btn small" to="/register">Get Started</Link>
          </>
        )}
      </div>
    </header>
  );
}
