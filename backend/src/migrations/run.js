import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  try {
    const files = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      console.log(`Running migration: ${file}`);

      const sql = fs.readFileSync(
        path.join(__dirname, file),
        "utf8"
      );

      await pool.query(sql);

      console.log(`✓ ${file} applied successfully.`);
    }

    console.log("All migrations completed.");
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();