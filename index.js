import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET =
  process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

app.use(bodyParser.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// POST /token/generate
app.post("/token/generate", (req, res) => {
  const { email, userId } = req.body;
  if (!userId || typeof userId !== "number") {
    return res.status(400).json({ error: "Missing userId" });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Missing email" });
  }

  const payload = { userId, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });

  res.json({ token });
});

// POST /token/validate
app.post("/token/validate", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, payload: decoded });
  } catch (err) {
    res.json({ valid: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on PORT ${PORT}`);
});
