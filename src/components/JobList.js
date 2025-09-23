import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) => {
        const onlyJobs = res.data.filter((job) => job.type === "job");
        setJobs(onlyJobs);
      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const title = job?.title?.toLowerCase() || "";
    const company = job?.company?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    const roleTerm = roleFilter.toLowerCase();
    return (
      (title.includes(search) || company.includes(search)) &&
      (roleFilter === "all" || title.includes(roleTerm))
    );
  });

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="pt-2 pb-5"
      style={{
        backgroundColor: "#fcfbfb",
        display: "flex",
        flexDirection: "column",
        minHeight: "auto",
        height: "100%",
      }}
    >
      <div className="container flex-grow-1">
        <h2
          className="text-center mb-5 fw-bold display-6 title-animate"
          style={{ color: "#2c3e50" }}
        >
          Latest Job Opportunities
        </h2>

        {/* Search + Filter */}
        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="🔍 Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
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

        {/* Loader */}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }}
          >
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : currentJobs.length === 0 ? (
          <p className="text-center text-muted mt-5">No jobs found.</p>
        ) : (
          <>
            {/* Job Cards */}
            <div className="row gy-4">
              {currentJobs.map((job) => (
                <div key={job._id} className="col-md-6 col-lg-4">
                  <Link
                    to={`/job/${job._id}`}
                    className="card h-100 text-decoration-none"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      color: "#34495e",
                      display: "flex",
                      flexDirection: "column",
                    }}
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

                      <div className="mb-3">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: "#2980b9",
                            color: "#fff",
                          }}
                        >
                          {job.location || "Location not specified"}
                        </span>
                        {job.isWFH && (
                          <span
                            className="badge ms-2"
                            style={{
                              backgroundColor: "#27ae60",
                              color: "#fff",
                            }}
                          >
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="mt-auto">
                        <span
                          className="card-footer text-muted small d-block mb-3"
                          style={{ backgroundColor: "#ecf0f1" }}
                        >
                          📅 {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                        {/* <button
                          className="btn w-100"
                          style={{
                            backgroundColor: "#2c3e50",
                            color: "#ffffff",
                            borderRadius: "50px",
                            border: "none",
                            padding: "10px 0",
                            fontWeight: "600",
                          }}
                        >
                          View Details
                        </button> */}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
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
                  {currentPage < totalPages && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </>
        )}
      </div>

      {/* Hover effect CSS */}
      <style>{`
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
