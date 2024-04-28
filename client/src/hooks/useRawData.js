import { useQuery, useMutation } from '@tanstack/react-query';

import useRawDataStore from 'src/store/rawDataStore';

import { fetchRawData } from '../api/rawDataApi';

export const useRawData = () => {

    const { todayDate, selectedDate, setSelectedRawData } = useRawDataStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['rawData'],
        queryFn: () => fetchRawData(todayDate),
        staleTime: Infinity,
        refetchInterval: 180000,
    });


    const selectedRawDataMutation = useMutation({
        mutationFn: () => fetchRawData(selectedDate),
        onSuccess: (d, variables, context) => { // d는 받은 값
            setSelectedRawData(d.data);
        },
        onError: (e, variables, context) => {
            setSelectedRawData([]);
        },
    })

    return { isPending, error, data, mutate: selectedRawDataMutation.mutate };
};