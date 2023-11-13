import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const addPushups = async (pushupCount: number) => {
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.post(`/pushups/add`, {
            googleId: googleId,
            pushupCount: pushupCount
        });
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getPushupStats = async () => {
    try {
        const response = await axiosInstance.get('/pushups/all');
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const pushupActions = {
    addPushups,
    getPushupStats
}