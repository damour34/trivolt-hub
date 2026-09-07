import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [updates, setUpdates] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);

  const navigate = useNavigate();

  function loadData() {
    setError("");

    api
      .getUpdates()
      .then(setUpdates)
      .catch((err) => setError(err.message));

    api
      .getApplications()
      .then(setApplications)
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }

    loadData();
  }, [navigate]);

  async function handlePostUpdate(e) {
    e.preventDefault();

    setPublishing(true);
    setError("");

    try {
      await api.createUpdate(form);

      setForm({
        title: "",
        body: "",
      });

      loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setPublishing(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteUpdate(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <div className="admin-brand">
              TRIVOLT<span>HUB</span>
            </div>

            <p className="admin-subtitle">
              Administration Dashboard
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-home-btn"
              onClick={() => navigate("/")}
            >
              View Website
            </button>

            <button
              className="admin-logout-btn"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="admin-main">
        {/* PAGE INTRO */}
        <section className="admin-intro">
          <div>
            <span className="admin-label">
              ADMIN / CONTROL CENTER
            </span>

            <h1>Dashboard</h1>

            <p>
              Manage company updates and review internship applications.
            </p>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <span className="stat-label">UPDATES</span>
            <strong>{updates.length}</strong>
            <p>Published updates</p>
          </div>

          <div className="admin-stat-card">
            <span className="stat-label">APPLICATIONS</span>
            <strong>{applications.length}</strong>
            <p>Internship applications</p>
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="admin-error" role="alert">
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
        )}

        {/* POST UPDATE */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <span className="section-number">01</span>
              <h2>Post an Update</h2>
            </div>

            <p>
              Share announcements, news and important information
              with the Trivolt Hub community.
            </p>
          </div>

          <div className="admin-card">
            <form
              className="admin-form"
              onSubmit={handlePostUpdate}
            >
              <label>
                Title
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter update title"
                  required
                />
              </label>

              <label>
                Body
                <textarea
                  rows={6}
                  value={form.body}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      body: e.target.value,
                    })
                  }
                  placeholder="Write your update..."
                  required
                />
              </label>

              <button
                type="submit"
                className="admin-primary-btn"
                disabled={publishing}
              >
                {publishing
                  ? "Publishing..."
                  : "Publish Update"}
              </button>
            </form>
          </div>
        </section>

        {/* EXISTING UPDATES */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <span className="section-number">02</span>
              <h2>Existing Updates</h2>
            </div>

            <p>
              Manage updates currently published on the website.
            </p>
          </div>

          {updates.length === 0 ? (
            <div className="admin-empty">
              <span>NO UPDATES</span>
              <p>
                There are currently no published updates.
              </p>
            </div>
          ) : (
            <div className="admin-updates-list">
              {updates.map((u) => (
                <article
                  className="admin-update-card"
                  key={u.id}
                >
                  <div className="admin-update-content">
                    <span className="admin-card-label">
                      COMPANY UPDATE
                    </span>

                    <h3>{u.title}</h3>

                    <p>{u.body}</p>
                  </div>

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* APPLICATIONS */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <span className="section-number">03</span>
              <h2>
                Internship Applications
                <span className="count-badge">
                  {applications.length}
                </span>
              </h2>
            </div>

            <p>
              Review students who have applied for the internship
              program.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="admin-empty">
              <span>NO APPLICATIONS</span>
              <p>
                No internship applications have been received yet.
              </p>
            </div>
          ) : (
            <div className="applications-grid">
              {applications.map((a) => (
                <article
                  className="application-card"
                  key={a.id}
                >
                  <div className="application-card-top">
                    <div className="applicant-avatar">
                      {a.full_name
                        ?.charAt(0)
                        ?.toUpperCase() || "A"}
                    </div>

                    <div>
                      <h3>{a.full_name}</h3>
                      <a href={`mailto:${a.email}`}>
                        {a.email}
                      </a>
                    </div>
                  </div>

                  <div className="application-details">
                    <div>
                      <span>PHONE</span>
                      <strong>
                        {a.phone || "Not provided"}
                      </strong>
                    </div>

                    <div>
                      <span>INSTITUTION</span>
                      <strong>{a.university}</strong>
                    </div>

                    <div>
                      <span>YEAR</span>
                      <strong>{a.year_of_study}</strong>
                    </div>

                    <div>
                      <span>TRACK</span>
                      <strong>{a.track}</strong>
                    </div>
                  </div>

                  {a.motivation && (
                    <div className="application-motivation">
                      <span>MOTIVATION</span>
                      <p>{a.motivation}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="admin-footer">
        <p>
          © {new Date().getFullYear()} TriVolt Hub — Admin
          Dashboard
        </p>
      </footer>
    </div>
  );
}