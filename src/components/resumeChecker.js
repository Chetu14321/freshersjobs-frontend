import React, { useState } from "react";
import axios from "axios";
import { CheckCircle, AlertCircle, Lightbulb, Gauge, Loader2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ResumeChecker.css";

function ResumeChecker() {
  const [jobDesc, setJobDesc] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDesc) return setError("⚠️ Upload resume and enter job description.");

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDesc", jobDesc);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/resume-checker`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data || {};

      setResult({
        atsScore: data.ats_score || 0,
        atsFriendliness: data.ats_friendliness || "Unknown",
        strengths: data.strengths || [],
        weaknesses: data.weaknesses || [],
        recommendations: data.recommendations || [],
      });
    } catch (err) {
      console.error(err);
      setError("❌ AI analysis failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 position-relative">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">📄 ATS Resume Checker</h2>
        <p className="text-muted">Analyze your resume for ATS compatibility</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 mb-4">
        <div className="mb-3">
          <label className="form-label fw-semibold">Upload Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Job Description</label>
          <textarea
            rows="5"
            className="form-control"
            placeholder="Paste the job description here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-bold d-flex justify-content-center align-items-center"
          disabled={loading}
        >
          Check Resume
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {!loading && result && (
        <div className="mt-4 card p-4 shadow-lg border-0 fade-in">
          <h4 className="fw-bold mb-2 d-flex align-items-center gap-2">
            <Gauge size={22} className="text-primary" /> ATS Score
          </h4>
          <p className="fw-semibold fs-5">{result.atsScore} / 100</p>

          <h4 className="fw-bold mt-3">ATS Friendliness</h4>
          <p className="fw-semibold">{result.atsFriendliness}</p>

          {result.strengths.length > 0 && (
            <div className="mt-3">
              <h5 className="fw-bold d-flex align-items-center gap-2">
                <CheckCircle className="text-success" size={20} /> Strengths
              </h5>
              <ul className="list-group list-group-flush">
                {result.strengths.map((s, idx) => (
                  <li key={idx} className="list-group-item text-success">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {result.weaknesses.length > 0 && (
            <div className="mt-3">
              <h5 className="fw-bold d-flex align-items-center gap-2">
                <AlertCircle className="text-danger" size={20} /> Weaknesses
              </h5>
              <ul className="list-group list-group-flush">
                {result.weaknesses.map((w, idx) => (
                  <li key={idx} className="list-group-item text-danger">{w}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="mt-3">
              <h5 className="fw-bold d-flex align-items-center gap-2">
                <Lightbulb className="text-warning" size={20} /> Recommendations
              </h5>
              <ul className="list-group list-group-flush">
                {result.recommendations.map((r, idx) => (
                  <li key={idx} className="list-group-item text-warning">💡 {r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Modal Loader */}
      {loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <div className="text-center bg-white p-4 rounded shadow-lg">
            <Loader2 className="spin mb-2" size={40} />
            <p className="fw-semibold mb-0">Analyzing your resume...</p>
          </div>
        </div>
      )}

      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-in; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.35);
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}

export default ResumeChecker;
