import { useRef, useState } from "react";

export default function ResumeUpload({ onAnalyze, loading }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const choose = (selected) => {
    const next = selected?.[0];
    if (!next) return;
    if (next.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }
    if (next.size > 5 * 1024 * 1024) {
      alert("Resume file must be smaller than 5 MB.");
      return;
    }
    setFile(next);
  };

  return (
    <div
      className={`upload-zone ${dragging ? "dragging" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); choose(e.dataTransfer.files); }}
    >
      <input ref={inputRef} hidden type="file" accept=".pdf,application/pdf" onChange={(e) => choose(e.target.files)} />
      <div className="upload-icon">↑</div>
      <h3>{file ? file.name : "Drop your PDF resume here"}</h3>
      <p>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB ready to analyze` : "or click to browse • PDF up to 5 MB"}</p>
      <div className="upload-actions">
        <button className="secondary-btn" onClick={() => inputRef.current?.click()}>
          {file ? "Choose another" : "Choose Resume"}
        </button>
        {file && (
          <button className="primary-btn" disabled={loading} onClick={() => onAnalyze(file)}>
            {loading ? "Analyzing…" : "Analyze Resume"}
          </button>
        )}
      </div>
    </div>
  );
}
