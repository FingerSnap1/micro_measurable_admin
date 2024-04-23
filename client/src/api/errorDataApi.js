import axiosInstance from './axiosInstance';

const requestURL = "/api/errData/day";

export const fetchErrorData = async (date) => {
    const requestBody = {
        date,
    }
    const response = await axiosInstance.post(requestURL, requestBody);

    console.log(response.data);
    return response.data;
};

export const updateErrorData= async (id, date, errorCause) => { 
    const requestBody = {
      id,
      date,
      errorCause
    };
  
    console.log("asdf", requestBody);
    const response = await axiosInstance.put(requestURL, requestBody);
  
    console.log(response.data);
    return response.data;
};