import axios from 'axios';

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
