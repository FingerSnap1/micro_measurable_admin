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

export const updateErrorData= async (id, date, errCause, solution, done) => { 
    const requestBody = {
        date : date.split(' ')[0],
      id,
      errCause,
      solution,
      done,
    };
  
    console.log("updateErrorData: ", requestBody);
    const response = await axiosInstance.put(requestURL, requestBody);
  
    console.log(response.data);
    return response.data;
};