const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const generateShortcode = require('../utils/generateShortcode');
const db = require('../data/db');

router.post('/shorturls', (req, res) => {
  const { url, shortcode, validity } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  const code = shortcode || generateShortcode();
  if (db[code]) {
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const now = new Date();
  const expiresIn = (validity && Number.isInteger(validity)) ? validity : 30;
  const expiry = new Date(now.getTime() + expiresIn * 60000);

  db[code] = { url, expiry };

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiry.toISOString()
  });
});

router.get('/:code', (req, res) => {
  const { code } = req.params;
  const data = db[code];

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = new Date();
  if (now > new Date(data.expiry)) {
    return res.status(410).json({ error: "Link expired" });
  }

  res.redirect(data.url);
});

module.exports = router;
