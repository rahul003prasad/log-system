import axios from 'axios';

// Use relative URL since Vite will proxy /logs requests to backend
const API_BASE_URL = '';
const API_URL = `${API_BASE_URL}/logs`;



export const getLogs = async (filters) => {
  const params = { ...filters };
  Object.keys(params).forEach(key => !params[key] && delete params[key]);
  const response = await axios.get(API_URL, { params });
  return response.data;
};
