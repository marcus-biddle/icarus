import { createAxiosInstance } from "./config/axios";

const axiosInstance = createAxiosInstance();

interface EventProps {
    eventName: string;
    eventCount: number;
}

const updateEvent = async ({ eventName, eventCount }: EventProps) => {
    const googleId = localStorage.getItem('idToken');
    console.log(googleId, eventName, eventCount)
    try {
        const response = await axiosInstance.put('/event', {
            googleId: googleId,
            event: eventName,
            count: eventCount
        });

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getEachEventForAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/event/totals');

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getTodaysEventForEachUser = async () => {
    try {
        const response = await axiosInstance.get('/event/totals/today');

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getYearEventForEachUser = async () => {
    try {
        const response = await axiosInstance.get('/event/totals/year');

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const eventActions = {
    updateEvent,
    getEachEventForAllUsers,
    getTodaysEventForEachUser,
    getYearEventForEachUser
}