import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", msg: "Please fill all fields." });
      return;
    }

    setStatus({ type: "loading", msg: "Sending message..." });

    setTimeout(() => {
      setStatus({ type: "success", msg: "Thank you! We will get back to you shortly." });
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      {/* SEO */}
      <Helmet>
        <title>Contact Us | Hire Chethan</title>
        <link rel="canonical" href="https://freshersjobs.shop/contact" />
        <meta
          name="description"
          content="Get in touch with Chethan M. Fill the contact form for inquiries, collaborations, or hiring opportunities."
        />
      </Helmet>

      <div className="card shadow-sm p-4 fade-in">
        <h2 className="mb-4 text-primary">Contact Me</h2>
        <p>
          Have questions, want to collaborate, or looking to hire? Fill out the form below and I’ll get back to you promptly.
        </p>

        <form onSubmit={handleSubmit} className="mb-4 fade-in-up">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="form-control"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={status?.type === "loading"}>
            {status?.type === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <div
            className={`alert ${
              status.type === "success"
                ? "alert-success"
                : status.type === "error"
                ? "alert-danger"
                : "alert-info"
            } fade-in-up`}
            role="alert"
          >
            {status.msg}
          </div>
        )}

        <hr />

        <div>
          <h5 className="fw-semibold mb-3">Contact Information</h5>
          <p>
            <strong>Email:</strong> <a href="mailto:chetuchethan87@gmail.com">chetuchethan87@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong> Not available
          </p>
          <p>
            <strong>Location:</strong> Bengaluru, Karnataka, India
          </p>
        </div>

        <div className="mt-4">
          <h5 className="fw-semibold mb-3">Follow Me</h5>
          <a
            href="https://www.linkedin.com/in/chethan-m-p-15691236a"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3 text-decoration-none text-primary"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <style>{`
        .fade-in { 
          opacity: 0; 
          animation: fadeIn 0.8s ease forwards; 
        }
        .fade-in-up { 
          opacity: 0; 
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards; 
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
