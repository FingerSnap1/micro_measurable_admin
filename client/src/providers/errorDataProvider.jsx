import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useErrorData } from 'src/hooks/useErrorData';

import Loading from 'src/loading';
import useErrorDataStore from 'src/store/errorDataStore';

export const ErrorDataProvider = ({ children }) => {
    const { isPending, error, data } = useErrorData();
    const { setErrorData, errorData } = useErrorDataStore();

    useEffect(() => {
        if(!isPending && !error && data){
            setErrorData(data.data);
            console.log(data.data);
        }
    }, [isPending, error, data, setErrorData]);

    return (
        errorData.length > 0 ? children : <div><Loading/></div>
    );
};

ErrorDataProvider.propTypes = {
    children: PropTypes.node,
};