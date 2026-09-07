const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getUpdates: () => request("/updates"),
  createUpdate: (data) => request("/updates", { method: "POST", body: JSON.stringify(data) }),
  deleteUpdate: (id) => request(`/updates/${id}`, { method: "DELETE" }),

  submitApplication: (data) =>
    request("/applications", { method: "POST", body: JSON.stringify(data) }),
  getApplications: () => request("/applications"),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
};
