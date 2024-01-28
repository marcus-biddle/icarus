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

const updateLeaderboardXp = async (body: {xpGain: number, userId: string}) => {
    try {
        const response = await axiosInstance.post('/leaderboard/update/xp', {
            xpGain: body.xpGain,
            userId: body.userId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateLeaderboardRank = async () => {
    try {
        const response = await axiosInstance.post('/leaderboard/update/rank', {
            
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const leaderboardActions = {
    getLeaderboard,
    updateLeaderboardXp,
    updateLeaderboardRank
}