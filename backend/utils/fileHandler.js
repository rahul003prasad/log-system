const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../logs.json');

// Read logs from JSON file
function readLogs() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist or has issues, return empty array
    return [];
  }
}

// Write logs array to JSON file
function writeLogs(logs) {
  try {
    // Stringify with indentation for readability
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  } catch (err) {
    throw new Error('Failed to write logs to file');
  }
}

module.exports = { readLogs, writeLogs };
