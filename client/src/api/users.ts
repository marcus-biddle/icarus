import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const findByGoogleId = async (googleId: string) => {
    try {
        // backend not built
        const response = await axiosInstance.get(`/users/${googleId}`);
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } 
        return null;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const createUser = async (googleId: string) => {

    try {
        const response = await axiosInstance.post('/create/user', {
            googleId: googleId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/user-list')
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const userActions = {
    findByGoogleId,
    createUser,
    getAllUsers,
}