import axiosInstance from './axiosInstance';

const requestURL = "/api/managerInfo";

export const fetchManager = async () => {
    const response = await axiosInstance.get(requestURL);
    return response.data;
};

export const createManager = async (nodeAddress,managerName, email) => {
  const requestBody = {
    nodeAddress,
    managerName,
    email,
  };

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};

export const updateManager = async (id, nodeAddress,managerName, email) => { 
  const requestBody = {
    id,
    nodeAddress,
    managerName,
    email,
  };

  console.log("asdf", requestBody);
  const response = await axiosInstance.put(requestURL, requestBody);

  return response.data;
};

export const deleteManager = async (id) => {
  const requestBody = {
    data: {
      id,
    }
  };

  const response = await axiosInstance.delete(requestURL, requestBody);

  return response.data;
};
