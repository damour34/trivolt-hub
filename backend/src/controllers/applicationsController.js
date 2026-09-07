import { query } from "../config/db.js";

const VALID_TRACKS = [
  "networking_internet_tech",
  "software_development",
  "computer_systems_architecture",
];

export async function submitApplication(req, res) {
  const { fullName, email, phone, university, yearOfStudy, track, motivation } = req.body;

  if (!fullName || !email || !university || !yearOfStudy || !track) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!VALID_TRACKS.includes(track)) {
    return res.status(400).json({ error: "Invalid track" });
  }

  const result = await query(
    `INSERT INTO applications (full_name, email, phone, university, year_of_study, track, motivation)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, created_at`,
    [fullName, email, phone || null, university, yearOfStudy, track, motivation || null]
  );

  res.status(201).json({ id: result.rows[0].id, submittedAt: result.rows[0].created_at });
}

export async function listApplications(req, res) {
  const result = await query(
    `SELECT id, full_name, email, phone, university, year_of_study, track, motivation, created_at
     FROM applications ORDER BY created_at DESC`
  );
  res.json(result.rows);
}
