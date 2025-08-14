import React, { useState, useEffect } from 'react';

const allowedLevels = ['error', 'warn', 'info', 'debug'];

export default function FilterBar({ onFiltersChange }) {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [timestampStart, setTimestampStart] = useState('');
  const [timestampEnd, setTimestampEnd] = useState('');

  // Debounce to avoid rapid API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      onFiltersChange({ message, level, resourceId, timestamp_start: timestampStart, timestamp_end: timestampEnd });
    }, 300);

    return () => clearTimeout(handler);
  }, [message, level, resourceId, timestampStart, timestampEnd, onFiltersChange]);

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Search message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option value="">All Levels</option>
        {allowedLevels.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <input
        type="text"
        placeholder="Resource ID"
        value={resourceId}
        onChange={e => setResourceId(e.target.value)}
      />
      <input
        type="datetime-local"
        value={timestampStart}
        onChange={e => setTimestampStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={timestampEnd}
        onChange={e => setTimestampEnd(e.target.value)}
      />
    </div>
  );
}
