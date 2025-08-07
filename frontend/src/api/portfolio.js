import axios from 'axios';

// The baseURL will be prefixed to all requests, and the proxy in package.json
// will forward them to your backend server in development.
const API = axios.create({ baseURL: '/api/portfolio' });

export const fetchSummary = async () => {
  const { data } = await API.get('/summary');
  return data;
};

export const fetchAllocation = async () => {
  const { data } = await API.get('/allocation');
  return data;
};

export const fetchPerformance = async () => {
  const { data } = await API.get('/performance');
  return data;
};

export const fetchHoldings = async () => {
  const { data } = await API.get('/holdings');
  return data;
};
