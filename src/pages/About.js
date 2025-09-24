import { useState } from "react";

const teamMembers = [
  {
    name: "Chethan M P",
    role: "Founder",
    bio: "Passionate about helping fresh graduates find their dream jobs.",
    img:"nan",
    linkedin: "https://www.linkedin.com/in/chethan-m-p-15691236a",
  }
  
];

export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (index) => {
    setSelectedMember(selectedMember === index ? null : index);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm border-0 p-4">
        <h2 className="fw-bold text-primary mb-3">About FreshersJobs</h2>
        <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Welcome to <strong>FreshersJobs</strong>, your trusted platform for
          the latest job openings, internships, and career opportunities for
          students and recent graduates. We are committed to helping freshers
          build their careers by providing timely, verified, and high-quality
          job information.
        </p>

        <h4 className="fw-semibold mt-4">🎯 Our Mission</h4>
        <p className="text-muted">
          To bridge the gap between aspiring professionals and employers by
          making job hunting simpler, faster, and more transparent. We aim to
          empower fresh graduates with reliable job listings and career
          guidance.
        </p>

        <h4 className="fw-semibold mt-4">✅ What We Offer</h4>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item border-0">
            🔹 Daily updates on <strong>fresher jobs & internships</strong>
          </li>
          <li className="list-group-item border-0">
            🔹 Verified listings from trusted companies
          </li>
          <li className="list-group-item border-0">
            🔹 Career resources, interview tips, and resume help
          </li>
          <li className="list-group-item border-0">
            🔹 Easy navigation by categories, skills, and locations
          </li>
        </ul>

        <h4 className="fw-semibold mt-4">🤝 Why Choose Us?</h4>
        <p className="text-muted">
          Unlike other portals, we focus solely on <strong>fresh graduates</strong>.
          Every listing is reviewed to ensure authenticity, so you can apply
          confidently without worrying about fake or irrelevant postings.
        </p>

        <h4 className="fw-semibold mt-4">👥 Meet the Team</h4>
        <div className="row g-4">
          {teamMembers.map((member, idx) => (
            <div
              key={member.name}
              className="col-md-4"
              style={{ cursor: "pointer" }}
              onClick={() => handleMemberClick(idx)}
              onKeyDown={(e) => e.key === 'Enter' && handleMemberClick(idx)}
              tabIndex={0}
              role="button"
              aria-expanded={selectedMember === idx}
            >
              <div
                className={`card h-100 shadow-sm border-0 p-3 text-center team-card ${
                  selectedMember === idx ? "active" : ""
                }`}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mb-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover", margin: "auto" }}
                />
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-primary mb-1">{member.role}</p>
                {selectedMember === idx && (
                  <p className="text-muted small px-3">{member.bio}</p>
                )}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm mt-2"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        <h4 className="fw-semibold mt-5">🌱 Our Values</h4>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item border-0">Integrity - We value honesty and transparency.</li>
          <li className="list-group-item border-0">Empowerment - Helping freshers succeed.</li>
          <li className="list-group-item border-0">Innovation - Continuously improving user experience.</li>
          <li className="list-group-item border-0">Community - Building connections between talent and employers.</li>
        </ul>

        <h4 className="fw-semibold mt-4">📢 Get Involved</h4>
        <p className="text-muted">
          Have feedback or suggestions? Want to partner with us or post a job?
          Feel free to <a href="/contact" className="text-primary">reach out</a>.  
          We love hearing from our community!
        </p>

        <div className="alert alert-info mt-4">
          <strong>FreshersJobs</strong> – Your career journey starts here.  
          Together, let’s build a brighter future 🚀
        </div>
      </div>

      <style>{`
        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: rgba(255 255 255 / 0.9);
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .team-card:hover,
        .team-card.active {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          background: #f0f8ff;
        }
        .team-card img {
          border: 4px solid #2980b9;
          box-shadow: 0 8px 15px rgba(41, 128, 185, 0.4);
        }
        a.btn-outline-primary:hover {
          background-color: #2980b9;
          color: white;
          border-color: #2980b9;
        }
      `}</style>
    </div>
  );
}
