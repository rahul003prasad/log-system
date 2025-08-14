import React, { useState, useEffect } from 'react';

const allowedLevels = ['error', 'warn', 'info', 'debug'];

export default function FilterBar({ onFiltersChange, currentFilters }) {
  const [message, setMessage] = useState(currentFilters.message || '');
  const [level, setLevel] = useState(currentFilters.level || '');
  const [resourceId, setResourceId] = useState(currentFilters.resourceId || '');
  const [timestampStart, setTimestampStart] = useState(currentFilters.timestamp_start || '');
  const [timestampEnd, setTimestampEnd] = useState(currentFilters.timestamp_end || '');

  // Synchronize incoming props with internal state on filter reset or change
  useEffect(() => {
    setMessage(currentFilters.message || '');
    setLevel(currentFilters.level || '');
    setResourceId(currentFilters.resourceId || '');
    setTimestampStart(currentFilters.timestamp_start || '');
    setTimestampEnd(currentFilters.timestamp_end || '');
  }, [currentFilters]);

  // Debounce filter change to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      onFiltersChange({
        message,
        level,
        resourceId,
        timestamp_start: timestampStart,
        timestamp_end: timestampEnd,
      });
    }, 350);

    return () => clearTimeout(handler);
  }, [message, level, resourceId, timestampStart, timestampEnd, onFiltersChange]);

  return (
    <div className="filter-bar">
      <input
        className="filter-input message-search"
        name="message"
        type="text"
        placeholder="Search message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        autoComplete="off"
      />
      <select
        className="filter-select"
        name="level"
        value={level}
        onChange={e => setLevel(e.target.value)}
      >
        <option value="">All Levels</option>
        {allowedLevels.map(lvl => (
          <option key={lvl} value={lvl}>
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </option>
        ))}
      </select>
      <input
        className="filter-input"
        name="resourceId"
        type="text"
        placeholder="Resource ID"
        value={resourceId}
        onChange={e => setResourceId(e.target.value)}
        autoComplete="off"
      />
      <input
        className="filter-input"
        name="timestamp_start"
        type="datetime-local"
        value={timestampStart}
        onChange={e => setTimestampStart(e.target.value)}
      />
      <input
        className="filter-input"
        name="timestamp_end"
        type="datetime-local"
        value={timestampEnd}
        onChange={e => setTimestampEnd(e.target.value)}
      />
    </div>
  );
}
