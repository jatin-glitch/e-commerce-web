import axios from 'axios';

// Detect if we're in production and use the correct API URL
const getApiUrl = () => {
  // Check if we're in production (deployed) environment
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Production environment - use the deployed backend URL
    return 'https://e-commerce-web-production-f0f4.up.railway.app/api';
  }
  // Development environment - use environment variable or localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

// Create a separate instance for image URLs
const getImageBaseUrl = () => {
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://e-commerce-web-production-f0f4.up.railway.app';
  }
  return import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';
};

export const imageBaseUrl = getImageBaseUrl();

export default api;

