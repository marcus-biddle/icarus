import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const createUser = async () => {
    const googleId = localStorage.getItem('idToken');
    try {
        const response = await axiosInstance.post('/users/create', {
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
        const response = await axiosInstance.get('/users/all')
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

// const getUser = async (googleId: string) => {
//     try {
//         const response = await axiosInstance.get(`/user-list/user?googleId=${googleId}`);
//         return response.data;

//     } catch (err) {
//         console.log('err', err);
//         return null;
//     }
// }

export const userActions = {
    createUser,
    getAllUsers,
}