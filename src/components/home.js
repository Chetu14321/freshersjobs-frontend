import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // ✅ ADD THIS
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

  const getColor = (color) => {
    if (color === "primary") return "#0d6efd";
    if (color === "success") return "#198754";
    if (color === "warning") return "#0d6efd";
    return "#0d6efd";
  };

  const getOptimizedImage = (url) => {
    if (!url) return "https://via.placeholder.com/120x60?text=No+Image";
    try {
      const ext = url.split(".").pop().toLowerCase();
      if (ext === "jpg" || ext === "jpeg" || ext === "png") {
        return url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="container py-5">
      {/* ✅ SEO META TAGS */}
      <Helmet>
        <title>Freshers Jobs & Internships in India | FreshersJobs.shop</title>
        <meta
          name="description"
          content="Find the latest jobs and internships for freshers in India. Explore entry-level opportunities, campus hiring, and career guidance with FreshersJobs.shop."
        />
        <link rel="canonical" href="https://freshersjobs.shop/" />
      </Helmet>

      {/* Hero Section */}
      <h1 className="mb-4 fw-bold text-center title-animate">
        Welcome to FreshersJobs
      </h1>
      <p className="text-center mb-5 lead text-secondary-contrast">
        Your gateway to freshers jobs, internships, and resume optimization.
      </p>

      {/* Cards Section */}
      <div className="row gy-4">
        {cardData.map(({ title, description, icon: Icon, link, color }, idx) => (
          <div
            key={title}
            className="col-md-4 fade-delay"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <Link
              to={link}
              className="card h-100 shadow-sm text-decoration-none hover-card"
              style={{ borderTop: `4px solid ${getColor(color)}` }}
            >
              <div className="card-body text-center">
                <Icon
                  size={48}
                  className="mb-3"
                  style={{ color: getColor(color) }}
                  strokeWidth={1.5}
                />
                <h2 className="card-title" style={{ color: getColor(color) }}>
                  {title}
                </h2>
                <p className="card-text text-secondary-contrast">
                  {description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* About Section */}
      <section className="mt-5 p-4 bg-light rounded shadow-sm fade-delay">
        <h2 className="mb-3 text-center">About FreshersJobs Portal</h2>
        <p
          className="text-center text-secondary-contrast mx-auto"
          style={{ maxWidth: "700px" }}
        >
          FreshersJobs helps entry-level graduates kickstart careers. We provide
          jobs, internships, and tools like resume ATS optimization.
        </p>
      </section>

      {/* Explore Section */}
      <section className="mt-5 text-center fade-delay">
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
              className="explore-link d-flex align-items-center justify-content-center gap-2 border rounded px-4 py-2 shadow-sm"
            >
              <Icon size={18} className="text-primary" /> {name}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="mt-5 fade-delay">
        <h2 className="mb-4 text-center">Latest Job Openings</h2>
        {loading && <p className="text-center">Loading jobs...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row gy-4">
          {jobs.slice(0, 6).map(({ _id, img, title, company, location }, idx) => (
            <div
              key={_id}
              className="col-md-4 fade-delay"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <Link
                to={`/job/${_id}`}
                className="card h-100 shadow-sm text-decoration-none hover-card"
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
                  {/* <picture>
                    <source srcSet={getOptimizedImage(img)} type="image/webp" />
                    <img
                      src={img || "https://via.placeholder.com/120x60?text=No+Image"}
                      alt={company || "Company Logo"}
                      width={120}
                      height={60}
                      loading="lazy"
                      style={{ objectFit: "contain" }}
                    />
                  </picture> */}
                </div>

                <div className="card-body text-center">
                  <h3 className="card-title text-primary">{title}</h3>
                  <p className="card-text text-secondary-contrast mb-1">
                    {company}
                  </p>
                  <p className="card-text text-secondary-contrast">
                    {location || "Location not specified"}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Inline Styles */}
      <style>{`
        .fade-delay { opacity: 0; animation: fadeUp 0.6s ease forwards; }
        .title-animate { opacity: 0; transform: translateY(-30px); animation: slideFadeIn 1s ease forwards; }
        .hover-card:hover { transform: translateY(-5px); box-shadow: 0 15px 25px rgba(0,0,0,0.2); }
        .explore-link { transition: all 0.3s ease; font-weight: 500; background-color: #fff; color: #212529; }
        .explore-link:hover { background-color: #0d6efd; color: #fff !important; }
        .explore-link:hover svg { color: #fff !important; }
        .text-secondary-contrast { color: #000000 !important; }
        @keyframes fadeUp { 0% { opacity:0; transform: translateY(20px);} 100% { opacity:1; transform:translateY(0);} }
        @keyframes slideFadeIn {0% {opacity:0; transform:translateY(-30px);} 100% {opacity:1; transform:translateY(0);} }
      `}</style>
    </div>
  );
};

export default HomeComponent;
