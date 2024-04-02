import { useQuery } from '@tanstack/react-query';

import useRawDataStore from 'src/store/rawDataStore';

import { fetchRawData } from '../api/rawDataApi';

export const useRawData = () => {

    const { selectedDate } = useRawDataStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['rawData'],
        queryFn: () => fetchRawData(selectedDate),
        staleTime: Infinity,
        refetchInterval: 300000,
    });

    return { isPending, error, data };
};