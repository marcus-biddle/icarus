import axios from 'axios';

// https://icarus-server.onrender.com/api
// http://localhost:3001/api

export const createAxiosInstance = () => {
  // Create an instance of Axios with custom configuration
  const instance = axios.create({
    baseURL: 'https://icarus-server.onrender.com/api',
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return instance;
};
