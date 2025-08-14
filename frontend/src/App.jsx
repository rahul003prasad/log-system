import React, { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import { getLogs } from './services/api';

function Spinner() {
  return <div className="loader" aria-label="Loading" />;
}

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLogs(filters);
      setLogs(data);
    } catch {
      setError('Failed to fetch logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFiltersChange = useCallback(newFilters => {
    setFilters(newFilters);
  }, []);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <main className="app-container">
      <h1 className="app-header">Log Ingestion and Querying System</h1>

      <div className="filter-bar-wrapper">
  <FilterBar onFiltersChange={handleFiltersChange} currentFilters={filters} />
  <button
    className="clear-filters-btn"
    onClick={clearFilters}
    aria-label="Clear Filters"
  >Clear Filters</button>
</div>





      {loading && <Spinner />}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && <LogList logs={logs} />}
    </main>
  );
}
