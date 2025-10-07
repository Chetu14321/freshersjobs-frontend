import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  FileSearch,
  Home,
  Info,
  Mail,
  ShieldCheck,
  FileText,
} from "lucide-react";

const cardData = [
  {
    title: "Jobs",
    description: "Explore the latest job openings and start your career.",
    icon: Briefcase,
    link: "/jobs",
    color: "primary",
  },
  {
    title: "Internships",
    description: "Find internships that will give you real-world experience.",
    icon: GraduationCap,
    link: "/internships",
    color: "success",
  },
  {
    title: "Resume ATS Finder",
    description:
      "Check your resume compatibility with ATS and improve your chances.",
    icon: FileSearch,
    link: "/resume-checker",
    color: "warning",
  },
];

const HomeComponent = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        const sortedJobs = (data.jobs || data).sort(
          (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
        );
        setJobs(sortedJobs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      {/* ✅ Hero Section */}
      <h1 className="mb-4 fw-bold text-center">Welcome to FreshersJobs</h1>
      <p className="text-center mb-5 lead">
        Your gateway to freshers jobs, internships, and resume optimization.
      </p>

      {/* ✅ Cards Section */}
      <div className="row gy-4">
        {cardData.map(({ title, description, icon: Icon, link, color }) => (
          <div key={title} className="col-md-4">
            <Link
              to={link}
              className={`card text-decoration-none border-${color} h-100 shadow-sm hover-shadow`}
              style={{ transition: "transform 0.3s" }}
            >
              <div className="card-body text-center">
                <Icon
                  size={48}
                  className={`mb-3 text-${color}`}
                  strokeWidth={1.5}
                />
                <h3 className={`card-title text-${color}`}>{title}</h3>
                <p className="card-text text-muted">{description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ About Section */}
      <section className="mt-5 p-4 bg-light rounded shadow-sm">
        <h2 className="mb-3 text-center">About FreshersJobs Portal</h2>
        <p
          className="text-center text-secondary mx-auto"
          style={{ maxWidth: "700px" }}
        >
          "FreshersJobs" is a dedicated platform designed to help entry-level
          graduates and freshers kickstart their professional careers. We
          provide timely updates on job openings, internships, walk-in drives,
          and career development tools such as resume ATS optimization. Our
          mission is to bridge the gap between fresh talent and recruiters by
          offering authentic, verified opportunities from reputed companies and
          industries across India.
        </p>
        <p
          className="text-center text-secondary mx-auto"
          style={{ maxWidth: "700px" }}
        >
          Whether you are searching for your first job, an internship to gain
          valuable experience, or tools to make your resume stand out,
          "FreshersJobs" aims to be your trusted partner on this journey. We
          also provide personalized job alerts, expert career advice, and
          support to help you navigate the competitive job market with
          confidence.
        </p>
        <p
          className="text-center text-secondary mx-auto"
          style={{ maxWidth: "700px" }}
        >
          Join thousands of freshers who have successfully found their dream
          jobs and internships through our platform. Start exploring now and
          take the first step towards a successful career!
        </p>
      </section>

      {/* ✅ Explore More Section */}
      <section className="mt-5 text-center">
        <h2 className="mb-4">Explore More on FreshersJobs</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {[
            { name: "Home", path: "/", icon: Home },
            { name: "Jobs", path: "/jobs", icon: Briefcase },
            { name: "Internships", path: "/internships", icon: GraduationCap },
            { name: "Resume ATS", path: "/resume-checker", icon: FileSearch },
            { name: "About", path: "/about", icon: Info },
            { name: "Contact", path: "/contact", icon: Mail },
            { name: "Privacy", path: "/privacy", icon: ShieldCheck },
            { name: "Terms", path: "/terms", icon: FileText },
          ].map(({ name, path, icon: Icon }) => (
            <Link
              key={name}
              to={path}
              className="explore-link d-flex align-items-center justify-content-center gap-2 border rounded px-4 py-2 text-decoration-none text-dark shadow-sm"
            >
              <Icon size={18} className="text-primary" />
              {name}
            </Link>
          ))}
        </div>

        <style>{`
          .explore-link {
            transition: all 0.3s ease;
            font-weight: 500;
            background-color: #fff;
          }
          .explore-link:hover {
            background-color: #0d6efd;
            color: #fff !important;
            // transform: scale(1.05);
          }
          .explore-link:hover svg {
            color: #fff !important;
          }
        `}</style>
      </section>

      {/* ✅ Latest Job Openings */}
      <section className="mt-5">
        <h2 className="mb-4 text-center">Latest Job Openings</h2>

        {loading && <p className="text-center">Loading jobs...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row gy-4">
          {jobs.length === 0 && !loading && !error && (
            <p className="text-center text-muted">
              No jobs available at the moment.
            </p>
          )}

          {jobs.slice(0, 6).map(({ _id, img, title, company, location }) => (
            <div key={_id} className="col-md-4">
              <Link
                to={`/job/${_id}`}
                className="card h-100 shadow-sm text-decoration-none"
                style={{ borderRadius: "12px", overflow: "hidden" }}
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
                      img || "https://via.placeholder.com/120x60?text=No+Image"
                    }
                    alt={company || "Company Logo"}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title text-primary">{title}</h5>
                  <p className="card-text text-muted mb-1">{company}</p>
                  <p className="card-text text-muted">
                    {location || "Location not specified"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Common Styles */}
      {/* cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc */}
    </div>
  );
};

export default HomeComponent;
