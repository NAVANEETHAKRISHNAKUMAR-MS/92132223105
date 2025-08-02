const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let logs = [];
let tokenStore = {}; // Stores temporary tokens by rollNo

// Simulate Auth
app.post("/evaluation-service/auth", (req, res) => {
  const {
    email,
    name,
    rollNo,
    accessCode,
    clientID,
    clientSecret,
  } = req.body;

  if (
    email &&
    name &&
    rollNo &&
    accessCode &&
    clientID &&
    clientSecret
  ) {
    const token = uuidv4();
    tokenStore[rollNo] = token;
    return res.json({ access_token: token });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
});

// Logs endpoint
app.post("/evaluation-service/logs", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!Object.values(tokenStore).includes(token)) {
    return res.status(403).json({ message: "Invalid token" });
  }

  const { stack, level, package: pkg, message } = req.body;
  const newLog = { id: uuidv4(), stack, level, package: pkg, message };
  logs.push(newLog);

  return res.json({ message: "Log added successfully", log: newLog });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
