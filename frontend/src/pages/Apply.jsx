import { Link } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm.jsx";
import "../styles/Apply.css";

export default function Apply() {
  return (
    <div className="apply-page">
      <nav className="apply-nav">
        <div className="apply-nav-inner">
          <Link to="/" className="apply-brand">
            TRIVOLT<span>HUB</span>
          </Link>

          <div className="apply-nav-links">
            <Link to="/">Home</Link>
            <Link to="/apply" className="active">
              Apply for Internship
            </Link>
          </div>
        </div>
      </nav>

      <main className="apply-main">
        <section className="apply-hero">
          <div className="apply-label">
            <span></span>
            INTERNSHIP PROGRAM
          </div>

          <h1>Apply for an Internship</h1>

          <p>
            Take the next step in your technology journey. Choose your track
            and tell us a little about yourself.
          </p>
        </section>

        <section className="apply-form-section">
          <div className="apply-form-card">
            <ApplicationForm />
          </div>
        </section>
      </main>

      <footer className="apply-footer">
        <p>
          © {new Date().getFullYear()} TriVolt Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}