import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { token } = await api.login(email, password);

      localStorage.setItem("adminToken", token);

      navigate("/admin");
    } catch (err) {
      setError(
        err?.message ||
          "Unable to log in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      {/* Background decoration */}
      <div className="admin-login-grid"></div>

      <main className="admin-login-wrapper">
        {/* Brand */}
        <div className="admin-login-brand">
          <span>TRIVOLT</span>
          <strong>HUB</strong>
        </div>

        {/* Login card */}
        <section className="admin-login-card">
          <div className="admin-login-heading">
            <span className="admin-login-label">
              ADMIN / SECURE ACCESS
            </span>

            <h1>Welcome back.</h1>

            <p>
              Sign in to access the Trivolt Hub administration
              dashboard.
            </p>
          </div>

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="admin-email">
              Email address

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label htmlFor="admin-password">
              Password

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            {error && (
              <div
                className="admin-login-error"
                role="alert"
              >
                <strong>Login failed</strong>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="admin-login-security">
            <span className="security-dot"></span>
            Secure administrator access
          </div>
        </section>

        {/* Back to website */}
        <button
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to website
        </button>

        <footer className="admin-login-footer">
          © {new Date().getFullYear()} TriVolt Hub
        </footer>
      </main>
    </div>
  );
}