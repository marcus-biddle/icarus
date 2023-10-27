import axios from 'axios';

const createAxiosInstance = () => {
  // Create an instance of Axios with custom configuration
  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return instance;
};

export default createAxiosInstance;
