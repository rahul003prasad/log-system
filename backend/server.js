const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const Joi = require('joi');

const logSchema = Joi.object({
  level: Joi.string().valid('error', 'warn', 'info', 'debug').required(),
  message: Joi.string().required(),
  resourceId: Joi.string().required(),
  traceId: Joi.string().optional(),
  spanId: Joi.string().optional(),
  commit: Joi.string().optional(),
  metadata: Joi.object().optional()
});


const app = express();
app.use(cors());
app.use(express.json());

let logs = [];

app.get('/logs', (req, res) => {
  let filtered = [...logs];
  const { message, level, resourceId, timestamp_start, timestamp_end } = req.query;

  if (message) {
    filtered = filtered.filter(l => l.message.toLowerCase().includes(message.toLowerCase()));
  }
  if (level) {
    filtered = filtered.filter(l => l.level === level);
  }
  if (resourceId) {
    filtered = filtered.filter(l => l.resourceId === resourceId);
  }
  if (timestamp_start) {
    filtered = filtered.filter(l => new Date(l.timestamp) >= new Date(timestamp_start));
  }
  if (timestamp_end) {
    filtered = filtered.filter(l => new Date(l.timestamp) <= new Date(timestamp_end));
  }

  res.json(filtered);
});

app.post('/logs', (req, res) => {

  const log = { ...req.body, timestamp: new Date().toISOString() };
  logs.push(log);
  broadcastNewLog(log);
  res.status(201).json(log);
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcastNewLog(log) {
  const message = JSON.stringify({ type: 'NEW_LOG', payload: log });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', ws => {
  console.log('Client connected to WebSocket');
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

// Export app for testing
module.exports = app;

// Start server only if this file is directly run
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
