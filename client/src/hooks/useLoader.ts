import { RootState } from '@/app/store';
import { stopLoading } from '@/features/loading/loadingSlice';
import { isOlderThan7Minutes } from '@/helpers/date';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoader = (fetchData: () => Promise<void>) => {
    const loading = useSelector((state: RootState) => state.loading.loading);
    const loadingTimestamp = useSelector((state: RootState) => state.loading.lastLoadTimestamp);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDataWithLoading = async () => {
            try {
                if (isOlderThan7Minutes(loadingTimestamp)) {
                    // const newTimestamp: string = new Date().toISOString();
                    // dispatch(startLoading(newTimestamp));
                }
                await fetchData();
            } finally {
                dispatch(stopLoading());
                console.log(loading)
            }
        };

        fetchDataWithLoading();
    }, []);

    return;
};
