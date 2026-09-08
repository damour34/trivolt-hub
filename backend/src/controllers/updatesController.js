import { query, pool } from "../config/db.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export async function listUpdates(req, res) {
  try {
    const result = await query(`
      SELECT
        u.id,
        u.title,
        u.body,
        u.type,
        u.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ui.id,
              'image_url', ui.image_url,
              'created_at', ui.created_at
            )
            ORDER BY ui.created_at ASC
          ) FILTER (WHERE ui.id IS NOT NULL),
          '[]'
        ) AS images
      FROM updates u
      LEFT JOIN update_images ui
        ON ui.update_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error listing updates:", err);
    res.status(500).json({
      error: "Failed to load updates.",
    });
  }
}

export async function createUpdate(req, res) {
  const { title, body } = req.body;

  const type = req.files?.length > 0 ? "PHOTO" : "TEXT";

  if (!title || !body) {
    return res.status(400).json({
      error: "Title and description are required.",
    });
  }

  if (type === "PHOTO" && (!req.files || req.files.length === 0)) {
    return res.status(400).json({
      error: "At least one image is required for a photo update.",
    });
  }

  const client = await pool.connect();

  try {
    /*
     * First upload images to Cloudinary.
     */
    const uploadedImages = [];

    if (type === "PHOTO") {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        uploadedImages.push({
          imageUrl: result.secure_url,
        });
      }
    }

    /*
     * Save the update and image URLs in PostgreSQL.
     */
    await client.query("BEGIN");

    const updateResult = await client.query(
      `
      INSERT INTO updates (title, body, type)
      VALUES ($1, $2, $3)
      RETURNING id, title, body, type, created_at
      `,
      [title, body, type]
    );

    const update = updateResult.rows[0];

    const images = [];

    for (const image of uploadedImages) {
      const imageResult = await client.query(
        `
        INSERT INTO update_images (update_id, image_url)
        VALUES ($1, $2)
        RETURNING id, update_id, image_url, created_at
        `,
        [update.id, image.imageUrl]
      );

      images.push(imageResult.rows[0]);
    }

    await client.query("COMMIT");

    res.status(201).json({
      ...update,
      images,
    });
  } catch (err) {
    await client.query("ROLLBACK");

    console.error("Error creating update:", err);

    res.status(500).json({
      error: "Failed to create update.",
    });
  } finally {
    client.release();
  }
}

export async function deleteUpdate(req, res) {
  const { id } = req.params;

  try {
    await query(
      "DELETE FROM updates WHERE id = $1",
      [id]
    );

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting update:", err);

    res.status(500).json({
      error: "Failed to delete update.",
    });
  }
}