import React from 'react';
import LogItem from './LogItem';

export default function LogList({ logs }) {
  // Just add the default parameter here—everything else is UNCHANGED!
  if (!logs || !logs.length) {
    return <p style={{ textAlign: 'center', fontSize: '1rem' }}>No logs found</p>;
  }
  return (
    <section className="log-list" aria-live="polite" aria-relevant="additions removals">
      {logs.map((log, idx) => (
        <LogItem key={idx} log={log} />
      ))}
    </section>
  );
}
