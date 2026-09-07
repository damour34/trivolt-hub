import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (email !== adminEmail) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
}
