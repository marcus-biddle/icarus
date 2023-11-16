import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const createPushupLog = async () => {
    // This will run when user logs in.
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.post('/pushups/create', {
            googleId: googleId,
        });

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const addPushups = async (pushupCount: number) => {
    // This will run whenever the modal button is clicked.
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.patch('/pushups/update/add', {
            googleId: googleId,
            pushupCount: pushupCount
        });
        //might not need to return anything
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getAllPushupStats = async () => {
    try {
        const response = await axiosInstance.get('/pushups/get/all');
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getUserPushupStats = async () => {
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.get(`/pushups/get/user/${googleId}`);
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getConversion = async () => {
    try {
        const response = await axiosInstance.get('/pushups/point-value');
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const pushupActions = {
    addPushups,
    getAllPushupStats,
    getUserPushupStats,
    createPushupLog,
    getConversion
}