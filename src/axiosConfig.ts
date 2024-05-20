import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your Node.js backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
