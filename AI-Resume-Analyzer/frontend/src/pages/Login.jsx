import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { loginUser } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError("");
    try {
      const data = await loginUser(form);
      localStorage.setItem("resumeai_token", data.token);
      localStorage.setItem("resumeai_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) { setError(err.response?.data?.message || "Login failed."); }
  };

  return <AuthForm title="Welcome back" subtitle="Sign in to access your resume insights." form={form} setForm={setForm} submit={submit} error={error} button="Login" footer={<>New here? <Link to="/register">Create an account</Link></>} />;
}

function AuthForm({ title, subtitle, form, setForm, submit, error, button, footer }) {
  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><span className="brand-mark">✦</span><span className="eyebrow">RESUMEAI</span><h1>{title}</h1><p>{subtitle}</p>{error && <Toast message={error} type="error" onClose={() => {}} />}<label>Email<input type="email" required value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/></label><button className="primary-btn wide">{button}</button><small>{footer}</small></form></main>;
}
