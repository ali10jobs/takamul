import axios from 'axios';
import type { ApiError } from '@/types/api';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.takamul.sa',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor — normalize errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      statusCode: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);

export { axiosClient };
