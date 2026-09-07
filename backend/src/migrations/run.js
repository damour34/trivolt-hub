import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const sql = fs.readFileSync(path.join(__dirname, "001_init.sql"), "utf8");
  try {
    await pool.query(sql);
    console.log("Migration applied successfully.");
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();
