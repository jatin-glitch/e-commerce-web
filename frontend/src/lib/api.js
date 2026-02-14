import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://e-commerce-web-production-f0f4.up.railway.app/api',
  withCredentials: true,
});

// Create a separate instance for image URLs
export const imageBaseUrl = 'https://e-commerce-web-production-f0f4.up.railway.app';

export default api;

