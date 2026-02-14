import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Create a separate instance for image URLs
export const imageBaseUrl = 'http://localhost:5000';

export default api;

