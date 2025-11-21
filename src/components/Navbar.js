import { useEffect, useState } from "react";
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
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // GET USER ON PAGE LOAD (CHECK LOGIN)
  useEffect(() => {
    fetch("https://freshersjobs-shop.onrender.com/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("USER DATA:", data);
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // LOGOUT USER
  const handleLogout = () => {
    fetch("https://freshersjobs-shop.onrender.com/auth/logout", {
      credentials: "include",
    }).finally(() => {
      setUser(null);
      window.location.reload();
    });
  };

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
        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold text-dark"
          to="/"
          style={{ fontSize: "1.8rem" }}
        >
          <span className="text-primary">Freshers</span>Job
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-outline-primary d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰
        </button>

        {/* Desktop Navigation */}
        <ul className="navbar-nav ms-auto d-none d-lg-flex flex-row gap-4 align-items-center mb-0">

          {navItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <NavLink end to={item.path} className="custom-link d-flex align-items-center gap-1">
                <item.icon size={18} className="text-primary" />
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* ABOUT DROPDOWN */}
          <li className="nav-item dropdown position-relative">
            <span className="custom-link d-flex align-items-center gap-1 dropdown-toggle no-arrow">
              <Info size={18} className="text-primary" />
              About
            </span>

            <ul className="dropdown-menu custom-dropdown shadow-sm">
              {aboutDropdown.map((item, idx) => (
                <li key={idx}>
                  <NavLink to={item.path} className="dropdown-item d-flex align-items-center gap-2">
                    <item.icon size={16} className="text-primary" /> {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          {/* USER PROFILE OR LOGIN */}
          <li className="nav-item dropdown">
            {!user ? (
              <a
                href="https://freshersjobs-shop.onrender.com/auth/google"
                className="btn btn-primary px-3 py-1"
              >
                Login with Google
              </a>
            ) : (
              <div className="dropdown">
                <img
                  src={user.picture}
                  alt="profile"
                  width={38}
                  height={38}
                  className="rounded-circle dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                />

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li className="dropdown-item fw-semibold">
                    {user.name} <br />
                    <small className="text-muted">{user.email}</small>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger d-flex gap-2" onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileSidebar"
        style={{ width: "260px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="fw-bold text-primary">Menu</h5>
          <button type="button" className="btn" data-bs-dismiss="offcanvas">
            <X size={24} />
          </button>
        </div>

        <div className="offcanvas-body p-0">
          <ul className="list-group list-group-flush">

            {navItems.map((item, idx) => (
              <li key={idx} className="list-group-item">
                <NavLink
                  to={item.path}
                  onClick={closeOffcanvas}
                  className="d-flex gap-2 text-decoration-none text-dark fw-semibold custom-link"
                >
                  <item.icon size={18} className="text-primary" />
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* ABOUT */}
            <li className="list-group-item">
              <div className="fw-semibold text-dark mb-2 d-flex gap-2">
                <Info size={18} className="text-primary" /> About
              </div>

              <ul className="list-unstyled ps-3">
                {aboutDropdown.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.path}
                      className="d-flex align-items-center gap-2 text-dark py-1"
                      onClick={closeOffcanvas}
                    >
                      <item.icon size={16} className="text-primary" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            {/* LOGIN / LOGOUT */}
            <li className="list-group-item text-center">
              {!user ? (
                <a href="https://freshersjobs-shop.onrender.com/auth/google" className="btn btn-primary w-100">
                  Login with Google
                </a>
              ) : (
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* CSS */}
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
        .dropdown-menu.custom-dropdown {
          border-radius: 10px;
          border: none;
          padding: 0.5rem 0;
          opacity: 0;
          transform: translateY(10px);
          visibility: hidden;
          transition: all 0.25s ease;
          min-width: 180px;
        }
        .nav-item.dropdown:hover .dropdown-menu {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }
      `}</style>
    </nav>
  );
}
