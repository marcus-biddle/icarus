import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const createUser = async ({ googleId, selectedItems, username, id } : {googleId: string, selectedItems: string[], username: string, id: string}) => {
    try {
        const response = await axiosInstance.post('/users/create', {
            googleId: googleId,
            selectedItems: selectedItems,
            username: username,
            id: id
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

const getUser = async (googleId: string) => {
    try {
        const response = await axiosInstance.get(`/users/find?googleId=${googleId}`);
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const userActions = {
    createUser,
    getAllUsers,
    getUser
}