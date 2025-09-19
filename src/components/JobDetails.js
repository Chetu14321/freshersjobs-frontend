import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AdSlot from "./AdSlot";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch main job details
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Fetch related jobs
    // Fetch related jobs
axios
  .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
  .then((res) => {
    const jobs = res.data
      .filter(
        (j) => j._id !== id && j.type === "job" // exclude current
      )
      .slice(0, 3); // show only 3 related jobs
    setRelatedJobs(jobs);
  })
  .catch((err) => console.error(err));

  }, [id]);

  if (loading || !job)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading job details...</p>
      </div>
    );

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4 mb-5">
          <div className="card-body p-4 p-md-5">
            {/* Banner Image */}
            {job.banner && (
              <img
                src={job.banner}
                alt="Job Banner"
                className="img-fluid rounded mb-4 animated-img"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  width: "100%",
                  border: "5px solid #2980b9",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
              />
            )}

            {/* Title + Company */}
            <div className="text-center mb-4">
              <h1 className="fw-bold text-dark title-animate">{job.title}</h1>
              <h4 className="text-muted">{job.company}</h4>
            </div>

            {/* Job Image */}
            {job.img && (
              <div className="text-center mb-4">
                <img
                  src={job.img}
                  alt={job.company}
                  className="img-fluid rounded animated-img"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    border: "5px solid #080a09ff",
                    boxShadow: "0 15px 30px rgba(148, 148, 148, 0.2)",
                  }}
                />
              </div>
            )}

            {/* Location + Remote */}
            <p className="text-center mb-3">
              <span className="badge bg-primary">{job.location}</span>
              {job.isWFH && (
                <span className="badge bg-success ms-2">Remote</span>
              )}
            </p>

            {/* Posted Date */}
            <p className="text-center text-secondary small mb-4">
              📅 Posted on {new Date(job.postedAt).toLocaleDateString()}
            </p>

            {/* Top Ad Slot */}
            <div className="p-3 bg-light rounded shadow-sm mb-4">
              <h5 className="fw-bold mb-3">Promotions</h5>
              <AdSlot height={120} width={728} />
            </div>

            {/* Job Details Table */}
            <h5 className="fw-semibold mb-3">Job Details</h5>
            <div className="table-responsive mb-4">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Job Role</th>
                    <td>{job.role || "-"}</td>
                  </tr>
                  <tr>
                    <th>Qualification</th>
                    <td>{job.qualification || "-"}</td>
                  </tr>
                  <tr>
                    <th>Batch</th>
                    <td>{job.batch || "-"}</td>
                  </tr>
                  <tr>
                    <th>Experience</th>
                    <td>{job.experience || "-"}</td>
                  </tr>
                  <tr>
                    <th>Salary / CTC</th>
                    <td>{job.salary || "-"}</td>
                  </tr>
                  <tr>
                    <th>Job Location</th>
                    <td>{job.location || "-"}</td>
                  </tr>
                  <tr>
                    <th>Last Date</th>
                    <td>
                      {job.lastDate
                        ? new Date(job.lastDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Job Description */}
            <h5 className="fw-semibold mb-3">Job Description</h5>
            <div
              className="text-secondary"
              style={{ lineHeight: "1.7" }}
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>

            {/* Apply Button */}
            <div className="d-grid mt-5">
              <a
                href={job.applyUrl}
                className="btn btn-primary btn-lg rounded-pill animated-btn"
                target="_blank"
                rel="noreferrer"
              >
                🚀 Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4 fw-bold">Related Jobs</h3>
            <div className="row g-4">
              {relatedJobs.map((rJob, index) => (
                <div
                  key={rJob._id}
                  className="col-md-6 col-lg-4 job-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className="card h-100 border-0 rounded-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold" style={{ color: "#34495e" }}>
                        {rJob.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {rJob.company}
                      </h6>
                      <div className="mb-3">
                        <span
                          className="badge"
                          style={{ backgroundColor: "#2980b9", color: "#fff" }}
                        >
                          {rJob.location}
                        </span>
                        {rJob.isWFH && (
                          <span
                            className="badge ms-2"
                            style={{ backgroundColor: "#27ae60", color: "#fff" }}
                          >
                            Remote
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/job/${rJob._id}`}
                        className="btn mt-auto"
                        style={{
                          backgroundColor: "#2c3e50",
                          color: "#fff",
                          borderRadius: "50px",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="card-footer text-muted small" style={{ backgroundColor: "#ecf0f1" }}>
                      📅 {new Date(rJob.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Ad Slot */}
        <div className="p-3 bg-light rounded shadow-sm mt-4">
          <h5 className="fw-bold mb-3">Promotions</h5>
          <AdSlot height={120} width={300} />
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        .animated-img {
          opacity: 0;
          transform: scale(0.9);
          animation: fadeInZoom 0.8s ease forwards;
        }

        .animated-img:nth-child(1) { animation-delay: 0.2s; }
        .animated-img:nth-child(2) { animation-delay: 0.4s; }

        .animated-btn {
          transform: translateY(20px);
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards 0.5s;
        }

        .title-animate {
          opacity: 0;
          transform: translateY(-30px);
          animation: slideFadeIn 1s ease forwards;
        }

        .job-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .job-card:hover {
          transform: scale(0.97);
          box-shadow: 0 20px 30px rgba(0,0,0,0.25);
        }

        @keyframes fadeInZoom {
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
