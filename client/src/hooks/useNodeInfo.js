import { useQuery, useMutation } from '@tanstack/react-query';

import { fetchNodes, createNode, updateNode, deleteNode } from '../api/nodeInfoApi';

export const useNodeInfo = () => {

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['nodes'],
        queryFn: () => fetchNodes(),
        staleTime: Infinity,
    });

    const addNodeMutation = useMutation({
        mutationFn: (newNode) => createNode(newNode.nodeAddress, newNode.location, newNode.latitude, newNode.longitude),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: () => {
            
        },
        onSettled: () => {
        
        },
    });

    const updateNodeMutation = useMutation({
        mutationFn: (newNode) => updateNode(newNode.id, newNode.nodeAddress, newNode.location, newNode.latitude, newNode.longitude, newNode.battery),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: () => {
            
        },
        onSettled: () => {
        
        },
    });

    const deleteNodeMutation = useMutation({
        mutationFn: (id) => deleteNode(id),
        onSuccess: (d, variables, context) => {
            console.log(d);
            refetch();
        },
        onError: () => {
            
        },
        onSettled: () => {
        
        },
        
    });

    return { isPending, error, data, addNodeMutation, updateNodeMutation, deleteNodeMutation };
};