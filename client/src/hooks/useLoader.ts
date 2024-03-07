import { RootState } from '@/app/store';
import { startLoading, stopLoading } from '@/features/loading/loadingSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useLoader = (fetchData: () => Promise<void>) => {
    const loading = useSelector((state: RootState) => state.loading.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDataWithLoading = async () => {
            try {
                dispatch(startLoading());
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
