import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const getMonthlyLeaderboard = async () => {
    try {
        const response = await axiosInstance.get(`/leaderboard`);
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateMonthlyLeaderboard = async ( userId: string, eventId: string, eventCount: number ) => {
    console.log('MONTHLY', userId, eventId, eventCount)
    try {
        const response = await axiosInstance.post('/leaderboard/update', {
            userId: userId,
            eventId: eventId,
            eventCount: eventCount
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const leaderboardActions = {
    getMonthlyLeaderboard,
    updateMonthlyLeaderboard
}