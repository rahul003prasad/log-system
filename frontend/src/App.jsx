import React, { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import { getLogs } from './services/api';

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFiltersChange = useCallback((newFilters) => setFilters(newFilters), []);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError(null);
      try {
        const data = await getLogs(filters);
        setLogs(data);
      } catch {
        setError('Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [filters]);

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h1>Log Ingestion and Querying System</h1>
      <FilterBar onFiltersChange={onFiltersChange} />
      {loading && <p>Loading logs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <LogList logs={logs} />}
    </div>
  );
}
