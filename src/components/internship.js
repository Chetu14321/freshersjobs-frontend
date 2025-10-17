import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Internship() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then(res => setInternships(res.data.filter(j => j.type === "internship")))
      .catch(err => console.error("Error fetching internships:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-5 fade-delay" style={{ backgroundColor: "#fcfbfb", minHeight: "100vh" }}>
      <Helmet>
        <title>Internship Opportunities for Freshers | FreshersJobs.shop</title>
        <meta
          name="description"
          content="Explore top internship opportunities for freshers across India. Find remote, on-site, and paid internships to kickstart your career."
        />
        <link rel="canonical" href="https://freshersjobs.shop/internships" />
      </Helmet>

      <div className="container">
        <h2 className="text-center mb-5 fw-bold display-6 title-animate" style={{ color: "#2c3e50" }}>
          🎓 Internship Opportunities
        </h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <p className="text-center text-muted mt-5">No internships available right now 😢</p>
        ) : (
          <div className="row gy-4">
            {internships.map((job, idx) => (
              <div key={job._id} className="col-md-6 col-lg-4 internship-card" style={{ animationDelay: `${idx*0.2}s` }}>
                <div className="card h-100 border-0 rounded-4 card-hover" style={{ background:"rgba(255,255,255,0.15)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-primary">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="mb-3">
                      <span className="badge" style={{ backgroundColor:"#2980b9", color:"#fff" }}>{job.location}</span>
                      {job.isWFH && <span className="badge ms-2" style={{ backgroundColor:"#27ae60", color:"#fff" }}>Remote</span>}
                    </p>
                    <Link to={`/job/${job._id}`} className="btn mt-auto" style={{ backgroundColor:"#2c3e50", color:"#fff", borderRadius:"50px" }}>View Details</Link>
                  </div>
                  <div className="card-footer text-muted small bg-light">
                    📅 {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .title-animate { opacity:0; transform:translateY(-30px); animation:slideFadeIn 1s ease forwards; }
        .internship-card { opacity:0; transform:translateY(20px); animation:fadeInUp 0.8s ease forwards; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
        @keyframes fadeInUp { to { opacity:1; transform:translateY(0); } }
        @keyframes slideFadeIn { 0% {opacity:0; transform:translateY(-30px);} 100% {opacity:1; transform:translateY(0);} }
      `}</style>
    </div>
  );
}
