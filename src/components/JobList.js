import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 6;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) => setJobs(res.data.filter((j) => j.type === "job")))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((j) => {
    const search = debouncedSearch.toLowerCase();
    const roleTerm = roleFilter.toLowerCase();
    const matchesSearch =
      (j.title || "").toLowerCase().includes(search) ||
      (j.company || "").toLowerCase().includes(search);
    const matchesRole =
      roleFilter === "all" ||
      (j.role && j.role.toLowerCase().includes(roleTerm)) ||
      (j.title || "").toLowerCase().includes(roleTerm);
    return matchesSearch && matchesRole;
  });

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const handlePageChange = (page) =>
    page >= 1 && page <= totalPages && setCurrentPage(page);

  return (
    <div
      className="pt-2 pb-5 fade-delay"
      style={{ backgroundColor: "#fcfbfb", minHeight: "100vh" }}
    >
      {/* Canonical & Meta for SEO */}
      <Helmet>
        <title>Latest Job Opportunities | FreshersJobs</title>
        <link rel="canonical" href="https://freshersjobs.shop/jobs" />
        <meta
          name="description"
          content="Browse the latest job openings for freshers and kickstart your career with FreshersJobs."
        />
      </Helmet>

      <div className="container">
        <h2
          className="text-center mb-5 fw-bold display-6 title-animate"
          style={{ color: "#2c3e50" }}
        >
          Latest Job Opportunities
        </h2>

        {/* Search & Filter */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="🔍 Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-2">
            <select
              className="form-select rounded-pill"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Roles</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="designer">Designer</option>
              <option value="mernstack">MERN Stack Developer</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }}
          >
            <div className="spinner-border text-secondary" role="status" />
          </div>
        ) : currentJobs.length === 0 ? (
          <p className="text-center text-muted mt-5">No jobs found.</p>
        ) : (
          <>
            <div className="row gy-4">
              {currentJobs.map((job, idx) => (
                <div
                  key={job._id}
                  className="col-md-6 col-lg-4 fade-delay"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <Link
                    to={`/job/${job._id}`}
                    className="card h-100 text-decoration-none card-hover"
                  >
                    <div
                      className="text-center p-3 bg-white"
                      style={{
                        height: "140px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          job.img ||
                          "https://via.placeholder.com/120x60?text=No+Image"
                        }
                        alt={job.company || "Company Logo"}
                        loading="lazy"
                        decoding="async"
                        width="120"
                        height="60"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column flex-grow-1">
                      <h5 className="card-title fw-bold text-primary">
                        {job.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {job.company}
                      </h6>
                      <p className="text-secondary mt-auto">
                        {job.location || "Location not specified"}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-5 d-flex justify-content-center">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Prev
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>

      <style>{`
        .fade-delay {
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
          will-change: transform, opacity;
        }
        .title-animate {
          opacity: 0;
          transform: translateY(-30px);
          animation: slideFadeIn 1s ease forwards;
          will-change: transform, opacity;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
