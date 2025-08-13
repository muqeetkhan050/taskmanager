import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.236.136.145:5001', // local

  headers: { 'Content-Type': 'application/json' },
});
export default axiosInstance;