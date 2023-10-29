import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const getAllRecentChanges = async () => {
    try {
        const response = await axiosInstance.get(`/changes`);
        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const recentChangesActions = {
    getAllRecentChanges
}