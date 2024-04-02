import axiosInstance from './axiosInstance';

const requestURL = "/api/rawData/day";

export const fetchRawData = async (date) => {
    const requestBody = {
        date,
    }
    const response = await axiosInstance.post(requestURL, requestBody);

    console.log(response);
    return response.data;
};