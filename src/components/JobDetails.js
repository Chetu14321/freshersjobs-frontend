import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet"; // ✅ SEO helper

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) =>
        setRelatedJobs(
          res.data.filter((j) => j._id !== id && j.type === "job").slice(0, 3)
        )
      )
      .catch(console.error);
  }, [id]);

  const getOptimizedImage = (url) => {
    if (!url) return "https://via.placeholder.com/800x400?text=No+Image";
    try {
      const ext = url.split(".").pop().toLowerCase();
      if (["jpg", "jpeg", "png"].includes(ext)) {
        return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      }
      return url;
    } catch {
      return url;
    }
  };

  if (loading || !job)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading job details...</p>
      </div>
    );

  const canonicalUrl = `https://freshersjobs.shop/jobs/${id}`;

  return (
    <div className="py-5 bg-light min-vh-100">
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>{`${job.title} - ${job.company} | FreshersJobs`}</title>
        <meta name="description" content={job.description?.slice(0, 160)} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="container">
        {/* Main Job Card */}
        <article className="card shadow-sm border-0 rounded-4 mb-5 p-4 p-md-5 fade-up">
          {job.banner && (
            <picture>
              <source srcSet={getOptimizedImage(job.banner)} type="image/webp" />
              <img
                src={job.banner}
                alt={`${job.title} Banner`}
                width="100%"
                height="400"
                className="img-fluid rounded mb-4 animated-img"
                loading="lazy"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                  border: "5px solid #2980b9",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
              />
            </picture>
          )}

          <header className="text-center mb-4">
            <h1 className="fw-bold title-animate">{job.title}</h1>
            <h2 className="text-secondary fs-4">{job.company}</h2>
          </header>

          {job.img && (
            <div className="text-center mb-4">
              <picture>
                <source srcSet={getOptimizedImage(job.img)} type="image/webp" />
                <img
                  src={job.img}
                  alt={`${job.company} Logo`}
                  width="100%"
                  height="400"
                  className="img-fluid rounded animated-img"
                  loading="lazy"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    border: "5px solid #34495e",
                    boxShadow: "0 15px 30px rgba(52,73,94,0.2)",
                  }}
                />
              </picture>
            </div>
          )}

          <p className="text-center mb-3">
            <span className="badge bg-primary">{job.location}</span>
            {job.isWFH && <span className="badge bg-success ms-2">Remote</span>}
          </p>

          <p className="text-center text-secondary small mb-4">
            📅 Posted on {new Date(job.postedAt).toLocaleDateString()}
          </p>

          <h3 className="fw-semibold mb-3">Job Details</h3>
          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle">
              <tbody>
                <tr><th>Job Role</th><td>{job.title || "-"}</td></tr>
                <tr><th>Qualification</th><td>{job.qualification || "-"}</td></tr>
                <tr><th>Batch</th><td>{job.batch || "-"}</td></tr>
                <tr><th>Experience</th><td>{job.experience || "-"}</td></tr>
                <tr><th>Salary / CTC</th><td>{job.salary || "-"}</td></tr>
                <tr><th>Location</th><td>{job.location || "-"}</td></tr>
                <tr><th>Last Date</th><td>{job.lastDate ? new Date(job.lastDate).toLocaleDateString() : "Not Mentioned"}</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="fw-semibold mb-3">Job Description</h3>
          <div
            className="text-secondary"
            style={{ lineHeight: "1.7" }}
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></div>

          <div className="d-grid mt-5">
            <a
              href={job.applyUrl}
              className="btn btn-primary btn-lg rounded-pill animated-btn"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              🚀 Apply Now
            </a>
          </div>
        </article>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <section className="mt-5">
            <h3 className="mb-4 fw-bold">Related Jobs</h3>
            <div className="row g-4">
              {relatedJobs.map((rJob, i) => (
                <div
                  key={rJob._id}
                  className="col-md-6 col-lg-4 job-card"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div
                    className="card h-100 border-0 rounded-4 p-3"
                    style={{
                      backdropFilter: "blur(12px)",
                      background: "rgba(255,255,255,0.15)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h4 className="card-title fw-bold">{rJob.title}</h4>
                      <h5 className="card-subtitle mb-2 text-muted">
                        {rJob.company}
                      </h5>
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
                          backgroundColor: "#34495e",
                          color: "#fff",
                          borderRadius: "50px",
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                    <div
                      className="card-footer text-muted small"
                      style={{ backgroundColor: "#ecf0f1" }}
                    >
                      📅 {new Date(rJob.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        .animated-img { opacity: 0; transform: scale(0.95); animation: fadeInZoom 0.8s ease forwards; }
        .animated-btn { transform: translateY(20px); opacity: 0; animation: fadeInUp 0.8s ease forwards 0.5s; }
        .title-animate { opacity: 0; transform: translateY(-30px); animation: slideFadeIn 1s ease forwards; }
        .job-card { opacity: 0; transform: translateY(20px); animation: fadeInUp 0.8s ease forwards; }
        .job-card:hover { transform: scale(0.97); box-shadow: 0 20px 30px rgba(0,0,0,0.25); }

        @keyframes fadeInZoom { to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes slideFadeIn { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
