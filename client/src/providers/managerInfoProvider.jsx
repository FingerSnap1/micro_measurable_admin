import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useManagerInfo } from 'src/hooks/useManagerInfo';

import Loading from 'src/loading';

import useManagerInfoStore from '../store/managerInfoStore';

export const ManagerInfoProvider = ({ children }) => {
    const { isPending, error, data } = useManagerInfo();
    const { setManagers, managers} = useManagerInfoStore();

    useEffect(() => {
        if(!isPending && !error && data){
            setManagers(data.data);
            console.log(data.data);
        }
    }, [isPending, error, data, setManagers]);

    return (
        managers.length > 0 ? children : <div><Loading/></div>
    );
};

ManagerInfoProvider.propTypes = {
    children: PropTypes.node,
};