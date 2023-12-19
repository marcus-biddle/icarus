import { createAxiosInstance } from "./config/axios";

const axiosInstance = createAxiosInstance();

// const addPoints = async (points: number) => {
//     const googleId = localStorage.getItem('idToken');
//     try {
//         const response = await axiosInstance.put('/points/create', {
//             googleId: googleId,
//             points: points
//         });

//         return response.data;
        
//     } catch (err) {
//         console.log('err', err);
//         return null;
//     }
// }

const getUserPoints = async () => {
    const googleId = localStorage.getItem('idToken') || '';
    try {
        // look into making this a GET request
        const response = await axiosInstance.post('/points/get', {
            googleId: googleId,
        });

        return response.data;
        
    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const pointsActions = {
    getUserPoints
}