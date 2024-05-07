import { useQuery, useMutation } from '@tanstack/react-query';

import { todayDate } from 'src/utils/format-time';

import useRawDataStore from 'src/store/rawDataStore';

import { fetchRawData } from '../api/rawDataApi';

// ----------------------------------------------------------------
export const useRawDataQuery = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['rawData'],
        queryFn: () => fetchRawData(todayDate()),
        staleTime: Infinity,
        refetchInterval: 1800000,
    });

    return { isPending, error, data };
};

export const useRawDataMutation = () => {

    const { selectedDate, setSelectedRawData } = useRawDataStore();

    const selectedRawDataMutation = useMutation({
        mutationFn: () => fetchRawData(selectedDate),
        onSuccess: (d, variables, context) => { // d는 받은 값
            setSelectedRawData(d.data);
        },
        onError: (e, variables, context) => {
            setSelectedRawData([]);
        },
    })

    return { mutate: selectedRawDataMutation.mutate };
};