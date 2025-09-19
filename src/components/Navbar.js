import { Link, NavLink } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Info,
  Mail,
  ShieldCheck,
  FileText,
  FileSearch,
  X,
} from "lucide-react";

export default function Navbar() {
  const closeOffcanvas = () => {
    const offcanvas = document.getElementById("mobileSidebar");
    if (offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
      bsOffcanvas?.hide();
    }
  };

  const navItems = [
    { name: "Jobs", path: "/", icon: Briefcase },
    { name: "Internships", path: "/internships", icon: GraduationCap },
    { name: "Resume ATS", path: "/resume-checker", icon: FileSearch },
    { name: "About", path: "/about", icon: Info },
  ];

  const extraItems = [
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Privacy", path: "/privacy", icon: ShieldCheck },
    { name: "Terms", path: "/terms", icon: FileText },
  ];

  return (
    <nav
      className="navbar navbar-light shadow-sm sticky-top"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold text-dark"
          to="/"
          style={{ fontSize: "1.8rem" }}
        >
          <span className="text-primary">Freshers</span>Job
        </Link>

        {/* Mobile Toggle */}
        <button
          className="btn btn-outline-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          ☰
        </button>

        {/* Desktop Links */}
        <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-4 align-items-center">
          {navItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <NavLink
                end
                to={item.path}
                className="custom-link d-flex align-items-center gap-1"
              >
                <item.icon size={18} className="text-primary" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        style={{ width: "260px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5
            className="offcanvas-title fw-bold text-primary"
            id="mobileSidebarLabel"
          >
            JobBoard Menu
          </h5>
          <button
            type="button"
            className="btn btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            {/* Use X icon inside button */}
            <X size={20} className="text-dark" />
          </button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="list-group list-group-flush">
            {[...navItems, ...extraItems].map((item, idx) => (
              <li key={idx} className="list-group-item">
                <NavLink
                  to={item.path}
                  onClick={closeOffcanvas}
                  className="d-flex align-items-center gap-2 text-decoration-none text-dark fw-semibold custom-link"
                >
                  <item.icon size={18} className="text-primary" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .custom-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: #333 !important;
          transition: all 0.3s ease;
        }
        .custom-link:hover {
          color: #0d6efd !important;
          transform: scale(1.1);
        }
        .custom-link.active {
          color: #0d6efd !important;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}
