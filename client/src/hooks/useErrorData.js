import { useQuery, useMutation } from '@tanstack/react-query';

import { todayDate } from 'src/utils/format-time';

import useErrorDataStore from 'src/store/errorDataStore';
import { fetchErrorData, updateErrorData } from 'src/api/errorDataApi';

// ----------------------------------------------------------------
export const useErrorDataQuery = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['errorData'],
        queryFn: () => fetchErrorData(todayDate()),
        staleTime: Infinity,
        refetchInterval: 1800000,
        retry: 0,
    });

    return { isPending, error, data};
};


export const useErrorDataMutation = () => {

    const { selectedDate, setSelectedErrorData } = useErrorDataStore();

    const selectedErrorDataMutation = useMutation({
        queryKey: ['errorDataMutation'],
        mutationFn: () => fetchErrorData(selectedDate),
        onSuccess: (d, variables, context) => {
            setSelectedErrorData(d.data);
        },
        onError: (e, variables, context) => {
            setSelectedErrorData([]);
        },
        retry: 0,
    });

    const updateErrorDataMutation = useMutation({
        mutationFn: (updatedData) => updateErrorData(updatedData.id, updatedData.date, updatedData.errorCause, updatedData.solution, updatedData.done ),
        onSuccess: (d, variables, context) => {
            console.log(d);
            selectedErrorDataMutation.mutate();
        },
        onError: (e, variables, context) => {
            console.log(e);
        },
        onSettled: () => {
        
        },
    });


    return { selectedErrorDataMutation, updateErrorDataMutation };
};