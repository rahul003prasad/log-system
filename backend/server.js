const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const logRoutes = require('./routes/logs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('Log Ingestion & Querying System Backend is running');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
