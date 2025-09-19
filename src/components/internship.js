import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Internship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) => {
        const onlyInternships = res.data.filter(
          (job) => job.type === "internship"
        );
        setInternships(onlyInternships);
      })
      .catch((err) => console.error("Error fetching internships:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}
    >
      <div className="container">
        {/* Animated Title */}
        <h2 className="text-center mb-5 fw-bold display-6 title-animate">
          🎓 Internship Opportunities
        </h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark" role="status"></div>
            <p className="mt-3">Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <p className="text-center text-muted mt-5">
            No internships available right now 😢
          </p>
        ) : (
          <div className="row g-4">
            {internships.map((job, index) => (
              <div
                key={job._id}
                className="col-md-6 col-lg-4 internship-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className="card h-100 border-0 rounded-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>

                    <p className="mb-3">
                      <span
                        className="badge"
                        style={{ backgroundColor: "#2980b9", color: "#fff" }}
                      >
                        {job.location}
                      </span>
                      {job.isWFH && (
                        <span
                          className="badge ms-2"
                          style={{ backgroundColor: "#27ae60", color: "#fff" }}
                        >
                          Remote
                        </span>
                      )}
                    </p>

                    <Link
                      to={`/job/${job._id}`}
                      className="btn mt-auto"
                      style={{
                        backgroundColor: "#2c3e50",
                        color: "#ffffff",
                        borderRadius: "50px",
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                  <div
                    className="card-footer text-muted small bg-light"
                  >
                    📅 {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animations CSS */}
      <style>{`
        .title-animate {
          opacity: 0;
          transform: translateY(-30px);
          animation: slideFadeIn 1s ease forwards;
        }

        .internship-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .internship-card:hover {
          transform: scale(0.97);
          box-shadow: 0 20px 30px rgba(187, 185, 185, 0.25);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
