import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("resumeai_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function analyzeResume(file) {
  const form = new FormData();
  form.append("resume", file);
  const { data } = await api.post("/resumes/analyze", form);
  return data;
}

export async function getJobs() {
  const { data } = await api.get("/jobs");
  return data;
}

export async function getRecommendations(skills) {
  const { data } = await api.post("/jobs/recommendations", { skills });
  return data.recommendations;
}

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function getHistory() {
  const { data } = await api.get("/resumes/history");
  return data;
}
