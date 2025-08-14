import axios from 'axios';

const API_URL = 'http://localhost:5000/logs';

export const getLogs = async (filters) => {
  // Remove empty filters to avoid sending unnecessary params
  const params = { ...filters };
  Object.keys(params).forEach(key => !params[key] && delete params[key]);
  
  const response = await axios.get(API_URL, { params });
  return response.data;
};
