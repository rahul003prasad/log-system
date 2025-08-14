import React from 'react';
import LogItem from './LogItem';

export default function LogList({ logs }) {
  if (!logs.length) return <p>No logs found</p>;
  return <div>{logs.map((log, index) => <LogItem key={index} log={log} />)}</div>;
}
