import { useQuery, useMutation } from '@tanstack/react-query';

// import { todayDate } from 'src/utils/format-time';

import { fetchErrorData } from 'src/api/errorDataApi';
import useErrorDataStore from 'src/store/errorDataStore';

// ----------------------------------------------------------------
export const useErrorData = () => {

    const { selectedDate, setSelectedErrorData } = useErrorDataStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['errorData'],
        queryFn: () => fetchErrorData('2024-04-12'),// ❗️수정 필요 - 당일 날짜로 todayDate()
        staleTime: Infinity,
    });

    const selectedErrorDataMutation = useMutation({
        mutationFn: () => fetchErrorData(selectedDate),
        onSuccess: (d, variables, context) => {
            setSelectedErrorData(d.data);
        },
        onError: (e, variables, context) => {
            setSelectedErrorData([]);
        },
    });


    return { isPending, error, data, mutate: selectedErrorDataMutation.mutate };
};