import { query } from "../config/db.js";

export async function listUpdates(req, res) {
  const result = await query(
    "SELECT id, title, body, created_at FROM updates ORDER BY created_at DESC"
  );
  res.json(result.rows);
}

export async function createUpdate(req, res) {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const result = await query(
    "INSERT INTO updates (title, body) VALUES ($1, $2) RETURNING id, title, body, created_at",
    [title, body]
  );
  res.status(201).json(result.rows[0]);
}

export async function deleteUpdate(req, res) {
  const { id } = req.params;
  await query("DELETE FROM updates WHERE id = $1", [id]);
  res.status(204).send();
}
