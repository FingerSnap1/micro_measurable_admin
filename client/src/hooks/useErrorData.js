import { useQuery } from '@tanstack/react-query';

import { fetchErrorData } from 'src/api/errorDataApi';
import useErrorDataStore from 'src/store/errorDataStore';

export const useErrorData = () => {

    const { selectedDate } = useErrorDataStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['errorData'],
        queryFn: () => fetchErrorData(selectedDate),
        staleTime: Infinity,
    });

    return { isPending, error, data };
};