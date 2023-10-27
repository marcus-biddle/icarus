import createAxiosInstance from "./config/axios";

const axiosInstance = createAxiosInstance();

const findByGoogleId = async (googleId: string) => {
    try {
        const response = await axiosInstance.get(`/users/${googleId}`);
        if (response.status === 200) {
            return response.data;
        } 
        return null;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const userActions = {
    findByGoogleId,
}