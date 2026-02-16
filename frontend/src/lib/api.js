import axios from 'axios';

// Detect if we're in production and use correct API URL
const getApiUrl = () => {
  // Check if we're in production (deployed) environment
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  console.log('Current hostname:', window.location.hostname);
  console.log('Is production:', isProduction);
  
  if (isProduction) {
    // Production environment - use deployed backend URL
    const prodUrl = 'https://e-commerce-web-production-f0f4.up.railway.app/api';
    console.log('Using production API URL:', prodUrl);
    return prodUrl;
  }
  // Development environment - use environment variable or localhost
  const devUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  console.log('Using development API URL:', devUrl);
  return devUrl;
};

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

// Add request interceptor to debug cookies
api.interceptors.request.use((config) => {
  console.log('Request cookies:', document.cookie);
  console.log('Request headers:', config.headers);
  return config;
});

// Add response interceptor to debug responses
api.interceptors.response.use(
  (response) => {
    console.log('Response headers:', response.headers);
    return response;
  },
  (error) => {
    console.log('Error response headers:', error.response?.headers);
    return Promise.reject(error);
  }
);

// Create a separate instance for image URLs
const getImageBaseUrl = () => {
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://e-commerce-web-production-f0f4.up.railway.app';
  }
  return import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';
};

export const imageBaseUrl = getImageBaseUrl();

export default api;

