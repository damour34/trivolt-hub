import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import "../styles/UpdatesFeed.css";

export default function UpdatesFeed() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUpdates() {
      try {
        setLoading(true);
        setError("");

        const data = await api.getUpdates();
        setUpdates(data);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load updates. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUpdates();
  }, []);

  if (loading) {
    return (
      <div className="updates-loading">
        <span className="updates-loading-dot"></span>
        Loading updates...
      </div>
    );
  }

  if (error) {
    return (
      <div className="updates-error">
        <strong>Unable to load updates</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="updates-empty">
        <span className="updates-empty-label">NO UPDATES</span>
        <h3>Nothing published yet.</h3>
        <p>
          Check back soon for news, announcements, and updates
          from Trivolt Hub.
        </p>
      </div>
    );
  }

  return (
    <div className="updates-feed">
      {updates.map((update) => (
        <article className="update-card" key={update.id}>
          <div className="update-card-top">
            <span className="update-label">UPDATE</span>

            <time dateTime={update.created_at}>
              {new Date(update.created_at).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </time>
          </div>

          <h3>{update.title}</h3>

          <p>{update.body}</p>
        </article>
      ))}
    </div>
  );
}
