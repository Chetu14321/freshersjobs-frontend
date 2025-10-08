import { Link, NavLink } from "react-router-dom";
import {
  Home,
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
    { name: "Home", path: "/", icon: Home },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Internships", path: "/internships", icon: GraduationCap },
    { name: "Resume ATS", path: "/resume-checker", icon: FileSearch },
  ];

  const aboutDropdown = [
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Privacy", path: "/privacy", icon: ShieldCheck },
    { name: "Terms", path: "/terms", icon: FileText },
  ];

  return (
    <nav
      className="navbar navbar-light shadow-sm sticky-top"
      style={{ backgroundColor: "#fff", transition: "all 0.3s ease" }}
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

        {/* Desktop Nav */}
        <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-4 align-items-center mb-0">
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

          {/* About Dropdown */}
          <li className="nav-item dropdown position-relative">
            <span className="custom-link d-flex align-items-center gap-1 dropdown-toggle no-arrow">
              <Info size={18} className="text-primary" /> About
            </span>
            <ul className="dropdown-menu custom-dropdown shadow-sm">
              {aboutDropdown.map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <item.icon size={16} className="text-primary" /> {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
        style={{ width: "260px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold text-primary">
            JobBoard Menu
          </h5>
          <button
            type="button"
            className="btn btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <X size={20} className="text-dark" />
          </button>
        </div>

        <div className="offcanvas-body p-0">
          <ul className="list-group list-group-flush">
            {navItems.map((item, idx) => (
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

            {/* Mobile About */}
            <li className="list-group-item">
              <div className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2">
                <Info size={18} className="text-primary" /> Terms and Conditions
              </div>
              <ul className="list-unstyled ps-3">
                {aboutDropdown.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.path}
                      onClick={closeOffcanvas}
                      className="d-flex align-items-center gap-2 text-decoration-none text-dark py-1"
                    >
                      <item.icon size={16} className="text-primary" />{" "}
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .custom-link {
          position: relative;
          font-size: 1.05rem;
          font-weight: 500;
          color: #333 !important;
          transition: color 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        /* Underline effect without layout shift */
        .custom-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 0;
          height: 2px;
          background-color: #0d6efd;
          transition: width 0.25s ease;
        }

        .custom-link:hover::after,
        .custom-link.active::after {
          width: 100%;
        }

        .custom-link:hover {
          color: #0d6efd !important;
        }

        /* Dropdown menu smooth hover */
        .dropdown-menu.custom-dropdown {
          border-radius: 10px;
          border: none;
          padding: 0.5rem 0;
          min-width: 180px;
          display: block;
          opacity: 0;
          transform: translateY(10px);
          visibility: hidden;
          transition: all 0.25s ease;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
        }

        .nav-item.dropdown:hover .dropdown-menu {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }

        .dropdown-item {
          padding: 0.55rem 1rem;
          font-weight: 500;
          color: #333 !important;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: #f1f5ff;
          color: #0d6efd !important;
        }

        .dropdown-toggle.no-arrow::after {
          display: none !important;
        }
      `}</style>
    </nav>
  );
}
