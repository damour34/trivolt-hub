// Usage: node scripts/hash-password.js "yourPasswordHere"
// Copy the printed hash into ADMIN_PASSWORD_HASH in your .env file.

import bcrypt from "bcrypt";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log(hash);
