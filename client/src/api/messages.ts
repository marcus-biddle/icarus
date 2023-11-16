import { createAxiosInstance } from "./config/axios";

const axiosInstance = createAxiosInstance();

const addMessage = async (message: string) => {
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.post('/messages', {
            content: message,
            googleId: googleId
          })

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getAllMessages = async () => {
    try {
        const response = await axiosInstance.get('/messages');

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const messageActions = {
    addMessage,
    getAllMessages
}