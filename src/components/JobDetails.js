import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdSlot from "./AdSlot";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`)
      .then((res) => setJob(res.data));
  }, [id]);

  if (!job)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading job details...</p>
      </div>
    );

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            {/* Banner Image */}
            {job.banner && (
              <img
                src={job.banner}
                alt="Job Banner"
                className="img-fluid rounded mb-4"
                style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
              />
            )}

            {/* Title + Company */}
            <div className="text-center mb-4">
              <h1 className="fw-bold text-dark">{job.title}</h1>
              <h4 className="text-muted">{job.company}</h4>
            </div>

            {/* Job Image */}
            {job.img && (
              <div className="text-center mb-4">
                <img
                  src={job.img}
                  alt={job.company}
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* Location + Remote */}
            <p className="text-center mb-3">
              <span className="badge bg-primary">{job.location}</span>
              {job.isWFH && <span className="badge bg-success ms-2">Remote</span>}
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

            {/* ✅ Job Details Table */}
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
                className="btn btn-primary btn-lg rounded-pill"
                target="_blank"
                rel="noreferrer"
              >
                🚀 Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Ad Slot */}
        <div className="p-3 bg-light rounded shadow-sm mt-4">
          <h5 className="fw-bold mb-3">Promotions</h5>
          <AdSlot height={120} width={300} />
        </div>
      </div>
    </div>
  );
}
