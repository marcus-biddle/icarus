import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const getLeaderboard = async () => {
    try {
        const response = await axiosInstance.get(`/leaderboard`);
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const leaderboardActions = {
    getLeaderboard
}