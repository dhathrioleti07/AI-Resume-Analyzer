import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import AnalysisResult from "../components/AnalysisResult";
import Toast from "../components/Toast";
import { analyzeResume, getRecommendations } from "../services/api";

export default function ResumeAnalyzer({ onAnalysis }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAnalyze = async (file) => {
    setLoading(true);
    setToast(null);
    try {
      const response = await analyzeResume(file);
      setResult(response.analysis);
      onAnalysis?.(response.analysis);
      localStorage.setItem("resumeai_last_analysis", JSON.stringify(response.analysis));
      try {
        const jobs = await getRecommendations(response.analysis.techSkills || []);
        localStorage.setItem("resumeai_jobs", JSON.stringify(jobs));
      } catch {}
      setToast({ message: "Resume analysis completed successfully.", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Backend unavailable. Start the backend server and try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
      <div className="page-title">
        <span className="eyebrow">RESUME INTELLIGENCE</span>
        <h1>Analyze your resume</h1>
        <p>Upload a PDF and receive an ATS-focused profile, skill gaps and actionable recommendations.</p>
      </div>
      <ResumeUpload onAnalyze={handleAnalyze} loading={loading} />
      {result && <AnalysisResult data={result} />}
    </main>
  );
}
