import React, { useState } from 'react';

export default function LogItem({ log }) {
  const [showMetadata, setShowMetadata] = useState(false);

  const levelClassMap = {
    error: 'log-error',
    warn: 'log-warn',
    info: 'log-info',
    debug: 'log-debug',
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-pressed={showMetadata}
      onClick={() => setShowMetadata(!showMetadata)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          setShowMetadata(!showMetadata);
        }
      }}
      className={`log-item ${levelClassMap[log.level] || ''}`}
    >
      <div className="log-field">
        <span className="log-label">Level:</span> {log.level}
      </div>
      <div className="log-field">
        <span className="log-label">Timestamp:</span>{' '}
        {new Date(log.timestamp).toLocaleString()}
      </div>
      <div className="log-field">
        <span className="log-label">Resource ID:</span> {log.resourceId}
      </div>
      <div className="log-field">
        <span className="log-label">Message:</span> {log.message}
      </div>
      <div className="log-field">
        <span className="log-label">Trace ID:</span> {log.traceId}
      </div>
      <div className="log-field">
        <span className="log-label">Span ID:</span> {log.spanId}
      </div>
      <div className="log-field">
        <span className="log-label">Commit:</span> {log.commit}
      </div>

      <button
  type="button"
  className="metadata-toggle"
  onClick={e => {
    e.stopPropagation();
    setShowMetadata(prev => !prev);
  }}
  aria-expanded={showMetadata}
  aria-controls={`metadata-${log.traceId}`}
>
  {showMetadata ? 'Hide Metadata' : 'Show Metadata'}
</button>


      {showMetadata && (
        <pre
          id={`metadata-${log.traceId}`}
          className="metadata-content"
          aria-live="polite"
        >
          {JSON.stringify(log.metadata, null, 2)}
        </pre>
      )}
    </article>
  );
}
