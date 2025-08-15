import React, { useState, useEffect, useCallback } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { getLogs } from './services/api';
import { connectWebSocket, disconnectWebSocket } from './services/socket';
import './App.css';

function Spinner() {
  return <div className="loader" aria-label="Loading" />;
}

export default function App() {
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('logs'); // 'logs' or 'analytics'

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

  useEffect(() => {
    connectWebSocket((newLog) => {
      if (matchesFilters(newLog, filters)) {
        setLogs(prev => [newLog, ...prev]);
      }
    });
    return () => {
      disconnectWebSocket();
    };
  }, [filters]);

  const matchesFilters = (log, f) => {
    if (f.message && !log.message.toLowerCase().includes(f.message.toLowerCase())) return false;
    if (f.level && log.level !== f.level) return false;
    if (f.resourceId && log.resourceId !== f.resourceId) return false;
    if (f.timestamp_start && new Date(log.timestamp) < new Date(f.timestamp_start)) return false;
    if (f.timestamp_end && new Date(log.timestamp) > new Date(f.timestamp_end)) return false;
    return true;
  };

  const handleFiltersChange = useCallback(newFilters => {
    setFilters(newFilters);
  }, []);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Log Ingestion and Querying System</h1>

      <div style={{ marginBottom: 16 }}>
  <button
    className={`tab-btn${view === 'logs' ? ' tab-active' : ''}`}
    onClick={() => setView('logs')}
    disabled={view === 'logs'}
  >
    Logs
  </button>
  <button
    className={`tab-btn${view === 'analytics' ? ' tab-active' : ''}`}
    onClick={() => setView('analytics')}
    disabled={view === 'analytics'}
  >
    Analytics
  </button>
</div>


      {view === 'logs' && (
        <>
          <div className="filter-bar-wrapper">
            <FilterBar onFiltersChange={handleFiltersChange} currentFilters={filters} />
            <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
          </div>

          {loading && <Spinner />}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && <LogList logs={logs} />}
        </>
      )}

      {view === 'analytics' && <AnalyticsDashboard logs={logs} />}
    </div>
  );
}