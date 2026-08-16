import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError("");
    try {
      const data = await registerUser(form);
      localStorage.setItem("resumeai_token", data.token);
      localStorage.setItem("resumeai_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) { setError(err.response?.data?.message || "Registration failed."); }
  };

  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><span className="brand-mark">✦</span><span className="eyebrow">GET STARTED</span><h1>Create your account</h1><p>Save resume analysis and track your career progress.</p>{error && <div className="error-box">{error}</div>}<label>Full name<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" minLength="6" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/></label><button className="primary-btn wide">Create Account</button><small>Already registered? <Link to="/login">Login</Link></small></form></main>;
}
