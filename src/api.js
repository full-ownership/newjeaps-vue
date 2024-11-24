// src/api.js
import axios from 'axios';

// BASE_URL 설정
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
