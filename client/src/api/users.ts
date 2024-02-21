import {createAxiosInstance} from "./config/axios";

const axiosInstance = createAxiosInstance();

const createUser = async ({ password, username, id, email } : {password: string, username: string, id: string, email: string }) => {
    try {
        const response = await axiosInstance.post('/user/create', {
            password: password,
            username: username,
            id: id,
            email: email
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const fetchUserForLogin = async ({ password, email } : {password: string, email: string }) => {
    try {
        const response = await axiosInstance.post('/user/login', {
            password: password,
            email: email,
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

const fetchUser = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/${userId}`);
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const fetchUsersYearSummaries = async (eventId: string) => {
    try {
        const response = await axiosInstance.get(`/users/all/year/${eventId}`);

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateUserYearCount = async (count: number, eventId: string, userId: string) => {
    try {
        const response = await axiosInstance.post('/users/update/yearSummary', {
            count: count,
            eventId: eventId,
            userId: userId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateUserMonthCount = async (count: number, eventId: string, userId: string) => {
    try {
        const response = await axiosInstance.post('/users/update/monthSummary', {
            count: count,
            eventId: eventId,
            userId: userId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const fetchUsersMonthSummaries = async (eventId: string) => {
    try {
        const response = await axiosInstance.get(`/users/all/month/${eventId}`);

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateStreak = async ( userId: string, eventId: string) => {
    try {
        const response = await axiosInstance.post('/users/update/streak', {
            eventId: eventId,
            userId: userId
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const updateStatistic = async ( userId: string, eventId: string, count: number) => {
    try {
        const response = await axiosInstance.post('/users/update/statistics', {
            eventId: eventId,
            userId: userId,
            count: count
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const rewardXp = async ( userId: string, eventId: string, count: number) => {
    try {
        const response = await axiosInstance.post('/users/update/xp', {
            eventId: eventId,
            userId: userId,
            count: count
        });

        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

const getAllUserXpGains = async () => {
    try {
        const response = await axiosInstance.get('/users/all/xpGains')
        return response.data;

    } catch (err) {
        console.log('err', err);
        return null;
    }
}

export const userActions = {
    createUser,
    fetchUserForLogin,
    getAllUsers,
    getUser,
    fetchUser,
    fetchUsersYearSummaries,
    updateUserYearCount,
    fetchUsersMonthSummaries,
    updateUserMonthCount,
    updateStreak,
    updateStatistic,
    rewardXp,
    getAllUserXpGains
}