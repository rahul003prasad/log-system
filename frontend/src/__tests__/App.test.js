import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as api from '../services/api'; // Import as *

import App from '../App';

// Mock the entire api module
jest.mock('../services/api');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Log Ingestion Frontend App', () => {

  test('renders header and initial UI elements', () => {
    render(<App />);
    expect(screen.getByText(/log ingestion and querying system/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search message/i)).toBeInTheDocument();
    expect(screen.getByText(/logs/i)).toBeInTheDocument();
  });

  test('loads and displays logs from API', async () => {
    const mockLogs = [
      { id: 1, message: 'Test log 1', level: 'info', resourceId: 'res1', timestamp: '2025-08-15T01:00:00Z' },
      { id: 2, message: 'Error log', level: 'error', resourceId: 'res2', timestamp: '2025-08-15T02:00:00Z' }
    ];

    // Use getLogs as in your api.js
    api.getLogs.mockResolvedValueOnce(mockLogs);

    render(<App />);

    // Wait for logs to appear
    for (const log of mockLogs) {
      await screen.findByText(log.message);
      expect(screen.getByText(log.resourceId)).toBeInTheDocument();
    }
  });

  test('filters update and trigger API call with correct parameters', async () => {
    api.getLogs.mockResolvedValueOnce([]);

    render(<App />);

    const messageInput = screen.getByPlaceholderText(/search message/i);
    await userEvent.type(messageInput, 'database error');

    const levelSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(levelSelect, 'error');

    const resourceIdInput = screen.getByPlaceholderText(/resource id/i);
    await userEvent.type(resourceIdInput, 'server-1234');

    await waitFor(() => {
      expect(api.getLogs).toHaveBeenCalledWith(expect.objectContaining({
        message: 'database error',
        level: 'error',
        resourceId: 'server-1234'
      }));
    });
  });

  test('displays loading and error states correctly', async () => {
    api.getLogs.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

    const errorMsg = await screen.findByText(/failed to fetch logs/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test('user clears filters resets input fields and reloads logs', async () => {
    api.getLogs.mockResolvedValueOnce([]);

    render(<App />);

    const messageInput = screen.getByPlaceholderText(/search message/i);
    await userEvent.type(messageInput, 'error');

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await userEvent.click(clearButton);

    expect(messageInput.value).toBe('');

    await waitFor(() => {
      expect(api.getLogs).toHaveBeenCalledWith(expect.objectContaining({}));
    });
  });
});
