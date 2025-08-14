import React from 'react';

const levelStyles = {
  error: { borderLeft: '4px solid #d32f2f', backgroundColor: '#fdecea', color: '#333' },
  warn: { borderLeft: '4px solid #f9a825', backgroundColor: '#fffbe6', color: '#333' },
  info: { borderLeft: '4px solid #0288d1', backgroundColor: '#e1f0fb', color: '#333' },
  debug: { borderLeft: '4px solid #999999', backgroundColor: '#f8f8f8', color: '#333' },
};

export default function LogItem({ log }) {
  const style = levelStyles[log.level] || {};
  return (
    <div style={{ ...style, padding: '10px', margin: '5px 0', borderRadius: '3px' }}>
      <div><strong>Level:</strong> {log.level}</div>
      <div><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</div>
      <div><strong>Resource ID:</strong> {log.resourceId}</div>
      <div><strong>Message:</strong> {log.message}</div>
      <div><strong>Trace ID:</strong> {log.traceId}</div>
      <div><strong>Span ID:</strong> {log.spanId}</div>
      <div><strong>Commit:</strong> {log.commit}</div>
      <div><strong>Metadata:</strong> <pre>{JSON.stringify(log.metadata, null, 2)}</pre></div>
    </div>
  );
}
