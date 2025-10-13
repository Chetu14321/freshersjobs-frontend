import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 fade-up">
      <div className="container py-5">
        <div className="row text-center text-md-start">
          {/* Brand Section */}
          <div className="col-12 col-md-4 mb-4 fade-delay" style={{ animationDelay: "0.1s" }}>
            <h4 className="fw-bold">
              <span className="text-primary">Job</span>Board
            </h4>
            <p className="small text-white">
              Discover jobs, internships, and opportunities that shape your future. 
              We connect talent with the right companies.
            </p>
            {/* LinkedIn */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a
                href="https://www.linkedin.com/in/chethan-m-p-15691236a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5 hover-icon"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-12 col-md-4 mb-4 fade-delay" style={{ animationDelay: "0.2s" }}>
            <h4 className="fw-bold mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-decoration-none text-white hover-link" to="/">Jobs</Link>
              </li>
              <li className="mb-2">
                <Link className="text-decoration-none text-white hover-link" to="/internships">Internships</Link>
              </li>
              <li className="mb-2">
                <Link className="text-decoration-none text-white hover-link" to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-md-4 mb-4 fade-delay" style={{ animationDelay: "0.3s" }}>
            <h4 className="fw-bold mb-3">Contact</h4>
            <p className="small mb-2">
              📧{" "}
              <a href="mailto:chetuchethan87@gmail.com" className="text-white text-decoration-none hover-link">
                chetuchethan87@gmail.com
              </a>
            </p>
            <p className="small mb-2">📍 Bangalore, India</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary text-white text-center py-3 fade-delay" style={{ animationDelay: "0.4s" }}>
        <p className="mb-0 small">
          © {new Date().getFullYear()} <span className="fw-bold">JobBoard</span>. All rights reserved.
        </p>
      </div>

      <style>{`
        /* Animations */
        .fade-up { opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s ease forwards; }
        .fade-delay { opacity: 0; transform: translateY(20px); animation: fadeUp 0.7s ease forwards; }

        /* Contrast adjustments */
        .text-secondary-contrast { color: #dcdcdc; } /* higher contrast than default text-secondary */
        a.text-white { color: #ffffff; }
        a.text-white:hover { color: #0d6efd !important; }

        /* Hover Effects */
        .hover-link:hover { color: #0d6efd !important; text-decoration: underline; transition: 0.3s; }
        .hover-icon:hover { color: #0d6efd !important; transform: scale(1.2); transition: 0.3s; }

        /* Keyframes */
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </footer>
  );
}
