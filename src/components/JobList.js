import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdSlot from "./AdSlot";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // 🔹 Loader state
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
      .finally(() => setLoading(false)); // ✅ loader ends only after fetch

    const subscribed = localStorage.getItem("subscribed");
    if (!subscribed) setShowSubscribe(true);
  }, []);

  const handleSubscribe = async () => {
    if (!email) return alert("Please enter your email");
    try {
      const res = await axios.post("/api/subscribe", { email });
      if (res.status === 200) {
        alert(res.data.message || "Subscribed successfully!");
        localStorage.setItem("subscribed", "true");
        setShowSubscribe(false);
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      alert(err.response?.data?.error || "Subscription failed!");
    }
  };

  const handleCloseSubscribe = () => setShowSubscribe(false);

  const filteredJobs = jobs.filter((job) => {
    const title = job?.title ? job.title.toLowerCase() : "";
    const company = job?.company ? job.company.toLowerCase() : "";
    const search = searchTerm.toLowerCase();
    const roleTerm = roleFilter.toLowerCase();
    return (
      (title.includes(search) || company.includes(search)) &&
      (roleFilter === "all" || title.includes(roleTerm))
    );
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div
      className="pt-3 pb-5"
      style={{ backgroundColor: "#f7f9f4ff", minHeight: "100vh" }}
    >
      <div className="container">
        <h5 className="mb-5 text-center fw-bold display-6 text-dark">
          🚀 Latest Job Opportunities
        </h5>

        {/* 🔹 Loader (initial full-screen) */}
        {loading && jobs.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {/* 🔹 Search + Role Filter */}
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

            {/* 🔹 Job Cards */}
            <div className="row g-4">
              {loading || currentJobs.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "30vh" }}>
                  <div className="loader"></div>
                </div>
              ) : (
                currentJobs.map((job) => (
                  <div key={job._id} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-dark">
                          {job.title}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {job.company}
                        </h6>
                        <p className="mb-2">
                          <span className="badge bg-primary">
                            {job.location}
                          </span>
                          {job.isWFH && (
                            <span className="badge bg-success ms-2">Remote</span>
                          )}
                        </p>
                        <Link
                          to={`/job/${job._id}`}
                          className="btn btn-dark rounded-pill mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                      <div className="card-footer text-muted small bg-light">
                        📅 {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 🔹 Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <ul className="pagination custom-pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
