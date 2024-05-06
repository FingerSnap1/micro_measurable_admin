import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNodeInfo } from 'src/hooks/useNodeInfo';

import Loading from 'src/loading';
import useNodeInfoStore from 'src/store/nodeInfoStore';

export const NodeInfoProvider = ({ children }) => {
    const { isPending, error, data } = useNodeInfo();
    const { setNodes } = useNodeInfoStore();

    useEffect(() => {
        if(data){
            setNodes(data.data);
            console.log(data.data);
        }
        else if(error){
            setNodes([]);
        }
    }, [error, data, setNodes]);

    return (
        !isPending ? children : <div><Loading/></div>
    );
};

NodeInfoProvider.propTypes = {
    children: PropTypes.any,
};