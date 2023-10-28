import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const findByGoogleId = async (googleId: string) => {
    try {
        // backend not built
        const response = await axiosInstance.get(`/users/${googleId}`);
        if (response.status === 200) {
            return response.data;
        } 
        return null;
        
    } catch (err) {
        console.log('err', err);
        // return null;
        return true
    }
}

const createUser = async (username: string) => {
    const googleId = localStorage.getItem('idToken') || '';

    try {
        const response = await axiosInstance.post('/create/user', {
            googleId: googleId,
            username: username
        });

        console.log(response);

        return response;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const userActions = {
    findByGoogleId,
    createUser,
}