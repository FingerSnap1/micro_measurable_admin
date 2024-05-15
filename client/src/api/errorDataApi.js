import axiosInstance from './axiosInstance';

const requestURL = "/api/errData";

export const fetchErrorData = async (date) => {
    const requestBody = {
        date,
    }
    const response = await axiosInstance.post(`${requestURL}/day`, requestBody);

    console.log(response.data);
    return response.data;
};

export const updateErrorData= async (id, date, errorCause, solution, done) => { 
    const requestBody = {
        date,
      id,
      errorCause,
      solution,
      done
    };
  
    console.log("updateErrorData: ", requestBody);
    const response = await axiosInstance.put(requestURL, requestBody);
  
    console.log(response.data);
    return response.data;
};