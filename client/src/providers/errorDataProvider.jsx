import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useErrorData } from 'src/hooks/useErrorData';

import Loading from 'src/loading';
import useOverViewStore from 'src/store/overViewStore';

export const ErrorDataProvider = ({ children }) => {
    const { isPending, error, data } = useErrorData();
    const { setErrorData } = useOverViewStore();

    useEffect(() => {
        if(data){
            setErrorData(data.data);
            console.log(data.data);
        }
        else if(error){
            setErrorData([]);
        }
    }, [error, data, setErrorData]);

    return (
        !isPending ? children : <div><Loading/></div>
    );
};

ErrorDataProvider.propTypes = {
    children: PropTypes.any,
};