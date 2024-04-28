import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchManager, createManager, updateManager, deleteManager } from '../api/managerInfoApi';

export const useManagerInfo = () => {

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['manager'],
        queryFn: () => fetchManager(),
        staleTime: Infinity,
    });

    const addManagerMutation = useMutation({
        mutationFn: (newManager) => createManager(newManager.nodeAddress, newManager.managerName, newManager.email),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: () => {
            
        },
        onSettled: () => {
        
        },
    });

    const updateManagerMutation = useMutation({
        mutationFn: (newManager) => updateManager(newManager.id, newManager.nodeAddress, newManager.managerName, newManager.email),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: (e, variables, context) => {
            console.log(e);
        },
        onSettled: () => {
        
        },
    });

    const deleteManagerMutation = useMutation({
        mutationFn: (id) => deleteManager(id),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: () => {
            
        },
        onSettled: () => {
        
        },
        
    });

    return { isPending, error, data, addManagerMutation, updateManagerMutation, deleteManagerMutation };
};