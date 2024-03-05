import { createAxiosInstance } from "./config/axios";

const axiosInstance = createAxiosInstance();

const getLogs = async () => {
    try {
        const response = await axiosInstance.get(`/logs`);
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const logActions = {
    getLogs
}