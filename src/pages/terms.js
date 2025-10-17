import { Helmet } from "react-helmet";

export default function Terms() {
  return (
    <div className="container my-4 fade-in">
      <Helmet>
        <title>Terms & Conditions | FreshersJobs</title>
        <link rel="canonical" href="https://freshersjobs.shop/terms" />
        <meta
          name="description"
          content="Read the Terms & Conditions of FreshersJobs to understand the rules, responsibilities, and limitations of using our website."
        />
      </Helmet>

      <div className="card shadow-sm p-4 fade-in-up">
        <h2 className="mb-3">Terms &amp; Conditions</h2>
        <p>
          Welcome to <strong>FreshersJobs</strong>. By accessing or using our
          website, you agree to be bound by these Terms &amp; Conditions. Please
          read them carefully before using our services.
        </p>

        <h4 className="mt-4">Use of Our Website</h4>
        <p>
          You agree to use FreshersJobs only for legitimate purposes, such as
          exploring job opportunities, internships, and career resources. You
          must not use this website for any unlawful, harmful, or fraudulent
          activity.
        </p>

        <h4 className="mt-4">Job Listings</h4>
        <p>
          We verify job and internship listings to the best of our ability.
          However, <strong>FreshersJobs</strong> does not guarantee the accuracy,
          completeness, or authenticity of third-party job postings. Users are
          advised to exercise due diligence before applying.
        </p>

        <h4 className="mt-4">Third-Party Links</h4>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for the content, privacy policies, or practices of any
          third-party websites.
        </p>

        <h4 className="mt-4">Intellectual Property</h4>
        <p>
          All content on FreshersJobs, including text, logos, and design, is the
          property of FreshersJobs and may not be copied or reproduced without
          prior written permission.
        </p>

        <h4 className="mt-4">Limitation of Liability</h4>
        <p>
          FreshersJobs will not be held responsible for any loss, damage, or
          inconvenience caused as a result of using our platform or relying on
          third-party job listings.
        </p>

        <h4 className="mt-4">Changes to Terms</h4>
        <p>
          We may update these Terms &amp; Conditions from time to time. Continued
          use of our website after changes indicates your acceptance of the
          updated terms.
        </p>

        <h4 className="mt-4">Contact Us</h4>
        <p>
          If you have any questions about these Terms &amp; Conditions, feel free
          to contact us at: <br />
          📧 <a href="mailto:chetuchethan87@gmail.com">chetuchethan87@gmail.com</a>
        </p>

        <p className="text-muted mt-4">
          Last updated: <strong>September 2025</strong>
        </p>
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
