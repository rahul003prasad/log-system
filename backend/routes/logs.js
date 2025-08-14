const express = require('express');
const { readLogs, writeLogs } = require('../utils/fileHandler');

const router = express.Router();

const allowedLevels = ['error', 'warn', 'info', 'debug'];

// POST /logs - Ingest a new log entry
router.post('/', (req, res) => {
  const log = req.body;

  // Validate required fields & schema
  if (
    !log.level || !allowedLevels.includes(log.level) ||
    !log.message || typeof log.message !== 'string' ||
    !log.resourceId || typeof log.resourceId !== 'string' ||
    !log.timestamp || typeof log.timestamp !== 'string' ||
    !log.traceId || typeof log.traceId !== 'string' ||
    !log.spanId || typeof log.spanId !== 'string' ||
    !log.commit || typeof log.commit !== 'string' ||
    typeof log.metadata !== 'object'
  ) {
    return res.status(400).json({ error: 'Invalid log schema or missing fields' });
  }

  try {
    const logs = readLogs();

    logs.push(log);

    writeLogs(logs);

    return res.status(201).json(log);
  } catch (err) {
    console.error('Error saving log:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /logs - Retrieve logs with optional combined filters
router.get('/', (req, res) => {
  try {
    let logs = readLogs();

    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit
    } = req.query;

    if (level) {
      if (allowedLevels.includes(level)) {
        logs = logs.filter(l => l.level === level);
      } else {
        return res.status(400).json({ error: 'Invalid level filter' });
      }
    }
    if (message) {
      const m = message.toLowerCase();
      logs = logs.filter(l => l.message.toLowerCase().includes(m));
    }
    if (resourceId) {
      const r = resourceId.toLowerCase();
      logs = logs.filter(l => l.resourceId.toLowerCase().includes(r));
    }
    if (timestamp_start) {
      const startDate = new Date(timestamp_start);
      if (!isNaN(startDate)) {
        logs = logs.filter(l => new Date(l.timestamp) >= startDate);
      }
    }
    if (timestamp_end) {
      const endDate = new Date(timestamp_end);
      if (!isNaN(endDate)) {
        logs = logs.filter(l => new Date(l.timestamp) <= endDate);
      }
    }
    if (traceId) {
      logs = logs.filter(l => l.traceId === traceId);
    }
    if (spanId) {
      logs = logs.filter(l => l.spanId === spanId);
    }
    if (commit) {
      logs = logs.filter(l => l.commit === commit);
    }

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json(logs);
  } catch (err) {
    console.error('Error retrieving logs:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
