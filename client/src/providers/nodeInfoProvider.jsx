import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import Loading from 'src/loading';
import useNodeInfoStore from 'src/store/nodeInfoStore';

export const NodeInfoProvider = ({ children }) => {
    const { isPending, error, data } = useNodeInfo();
    const { setNodes, nodes} = useNodeInfoStore();

    useEffect(() => {
        if(!isPending && !error && data){
            setNodes(data.data);
            console.log(data.data);
        }
    }, [isPending, error, data, setNodes]);

    return (
        nodes.length > 0 ? children : <div><Loading/></div>
    );
};

NodeInfoProvider.propTypes = {
    children: PropTypes.node,
};