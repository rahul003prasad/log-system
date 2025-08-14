import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Colors per level (match your log styles)
const COLORS = {
  error: '#d32f2f',
  warn: '#f9a825',
  info: '#0288d1',
  debug: '#6e6e6e',
};

export default function AnalyticsDashboard({ logs }) {
  // Aggregate log counts per level
  const countsByLevel = useMemo(() => {
    const counts = { error: 0, warn: 0, info: 0, debug: 0 };
    logs.forEach((log) => {
      if (counts[log.level] !== undefined) counts[log.level]++;
    });
    return Object.entries(counts).map(([level, count]) => ({ level, count }));
  }, [logs]);

  // Prepare data for time series (logs per day)
  const countsByDate = useMemo(() => {
    const dateCounts = {};
    logs.forEach((log) => {
      const dateKey = new Date(log.timestamp).toISOString().substring(0, 10);
      dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
    });
    // Convert to sorted array
    return Object.entries(dateCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [logs]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Log Level Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={countsByLevel}
            dataKey="count"
            nameKey="level"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => entry.level}
          >
            {countsByLevel.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.level]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: 40 }}>Logs Over Time (per day)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={countsByDate}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0288d1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
