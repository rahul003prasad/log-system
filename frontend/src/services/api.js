import axios from 'axios';

// Use environment variable if set, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API_URL = `${API_BASE_URL}/logs`;

export const getLogs = async (filters) => {
  // Remove empty filters to avoid sending unnecessary params
  const params = { ...filters };
  Object.keys(params).forEach((key) => {
    if (!params[key]) delete params[key];
  });

  const response = await axios.get(API_URL, { params });
  return response.data;
};
