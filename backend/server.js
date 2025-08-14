// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- In-memory logs store for demo ---
let logs = [];

// --- API endpoint for existing logs (with filters) ---
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

// --- Endpoint to add a new log ---
app.post('/logs', (req, res) => {
  const log = { ...req.body, timestamp: new Date().toISOString() };
  logs.push(log);

  // Broadcast the new log to all WebSocket clients
  broadcastNewLog(log);

  res.status(201).json(log);
});

// --- Create HTTP server for both Express and WS ---
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all connected clients
function broadcastNewLog(log) {
  const message = JSON.stringify({ type: 'NEW_LOG', payload: log });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// --- WebSocket connection handling ---
wss.on('connection', ws => {
  console.log('Client connected to WebSocket');

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
