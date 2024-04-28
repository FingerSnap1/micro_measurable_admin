import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRawData } from 'src/hooks/useRawData';

import Loading from 'src/loading';
import useRawDataStore from 'src/store/rawDataStore';


export const RawDataProvider = ({ children }) => {
    const { isPending, error, data } = useRawData();
    const { todayRawData, setTodayRawData, setSelectedRawData } = useRawDataStore();

    useEffect(() => {
        if(!isPending && !error && data){
            setTodayRawData(data.data);
            setSelectedRawData(data.data);
            console.log(data.data);
        }
    }, [isPending, error, data, setTodayRawData, setSelectedRawData]);

    return (
        todayRawData.length > 0 ? children : <div><Loading/></div>
    );
};

RawDataProvider.propTypes = {
    children: PropTypes.node,
};