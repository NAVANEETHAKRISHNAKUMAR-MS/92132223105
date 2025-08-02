const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
