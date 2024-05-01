import { useQuery, useMutation } from '@tanstack/react-query';

// import { todayDate } from 'src/utils/format-time';

import { fetchErrorData } from 'src/api/errorDataApi';
import useErrorDataStore from 'src/store/errorDataStore';

// ----------------------------------------------------------------
export const useErrorData = () => {

    const { selectedDate, setSelectedErrorData } = useErrorDataStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['errorData'],
        queryFn: () => fetchErrorData('2024-05-01'),// ❗️수정 필요 todayDate()
        staleTime: Infinity,
        refetchInterval: 1800000,
        retry: 0,
    });

    const selectedErrorDataMutation = useMutation({
        mutationFn: () => fetchErrorData(selectedDate),
        onSuccess: (d, variables, context) => {
            setSelectedErrorData(d.data);
        },
        onError: (e, variables, context) => {
            setSelectedErrorData([]);
        },
        retry: 0,
    });


    return { isPending, error, data, mutate: selectedErrorDataMutation.mutate };
};