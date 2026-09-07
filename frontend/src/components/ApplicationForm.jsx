import { useState } from "react";
import { api } from "../api/client.js";

const TRACKS = [
  {
    value: "networking_internet_tech",
    label: "Networking and Internet Technology",
  },
  {
    value: "software_development",
    label: "Software Development",
  },
  {
    value: "computer_systems_architecture",
    label: "Computer Systems and Architecture",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  yearOfStudy: "",
  track: TRACKS[0].value,
  motivation: "",
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    state: "idle",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear old messages when user starts editing again
    if (status.state !== "idle" && status.state !== "submitting") {
      setStatus({
        state: "idle",
        message: "",
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus({
      state: "submitting",
      message: "",
    });

    try {
      await api.submitApplication(form);

      setStatus({
        state: "success",
        message:
          "Your application has been submitted successfully. We'll be in touch soon.",
      });

      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err?.message ||
          "Something went wrong while submitting your application. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="application-form">
      {/* FULL NAME */}
      <label htmlFor="fullName">
        Full name
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />
      </label>

      {/* EMAIL */}
      <label htmlFor="email">
        Email address
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>

      {/* PHONE */}
      <label htmlFor="phone">
        Phone number
        <span className="field-hint">Yours or a parent/guardian's</span>

        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+250 7XX XXX XXX"
          autoComplete="tel"
        />
      </label>

      {/* UNIVERSITY */}
      <label htmlFor="university">
        University / Institution
        <input
          id="university"
          type="text"
          name="university"
          value={form.university}
          onChange={handleChange}
          placeholder="Enter your university or institution"
          autoComplete="organization"
          required
        />
      </label>

      {/* YEAR OF STUDY */}
      <label htmlFor="yearOfStudy">
        Year of study
        <input
          id="yearOfStudy"
          type="text"
          name="yearOfStudy"
          value={form.yearOfStudy}
          onChange={handleChange}
          placeholder="e.g. Year 2"
          required
        />
      </label>

      {/* TRACK */}
      <label htmlFor="track">
        Internship track
        <select
          id="track"
          name="track"
          value={form.track}
          onChange={handleChange}
          required
        >
          {TRACKS.map((track) => (
            <option key={track.value} value={track.value}>
              {track.label}
            </option>
          ))}
        </select>
      </label>

      {/* MOTIVATION */}
      <label htmlFor="motivation">
        Why do you want to join?
        <span className="field-hint"></span>

        <textarea
          id="motivation"
          name="motivation"
          rows={5}
          value={form.motivation}
          onChange={handleChange}
          placeholder="Tell us briefly about your interests, goals, or what you hope to learn..."
        />
      </label>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={status.state === "submitting"}
      >
        {status.state === "submitting"
          ? "Submitting application..."
          : "Submit application"}
      </button>

      {/* SUCCESS */}
      {status.state === "success" && (
        <div className="application-message success" role="status">
          <strong>Application received</strong>
          <p>{status.message}</p>
        </div>
      )}

      {/* ERROR */}
      {status.state === "error" && (
        <div className="application-message error" role="alert">
          <strong>Submission failed</strong>
          <p>{status.message}</p>
        </div>
      )}
    </form>
  );
}