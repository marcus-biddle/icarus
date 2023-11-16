import axios from 'axios';

export const createAxiosInstance = () => {
  // Create an instance of Axios with custom configuration
  const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return instance;
};
