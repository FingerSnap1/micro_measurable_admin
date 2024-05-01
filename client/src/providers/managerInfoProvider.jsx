import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useManagerInfo } from 'src/hooks/useManagerInfo';

import Loading from 'src/loading';

import useManagerInfoStore from '../store/managerInfoStore';

export const ManagerInfoProvider = ({ children }) => {
    const { isPending, error, data } = useManagerInfo();
    const { setManagers } = useManagerInfoStore();

    useEffect(() => {
        if(data){
            setManagers(data.data);
            console.log(data.data);
        }
        else if(error){
            setManagers([]);
        }
    }, [error, data, setManagers]);

    return (
        !isPending ? children : <div><Loading/></div>
    );
};

ManagerInfoProvider.propTypes = {
    children: PropTypes.node,
};