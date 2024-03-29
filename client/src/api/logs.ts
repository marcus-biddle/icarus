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

const updateLogs = async (count: number, eventId: string, action: string, userId: string) => {
    try {
        const response = await axiosInstance.post('/logs/update', {
            action: action,
            amount: count,
            event: eventId,
            userId: userId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const logActions = {
    getLogs,
    updateLogs
}