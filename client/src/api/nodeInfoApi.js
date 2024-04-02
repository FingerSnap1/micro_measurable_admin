import axiosInstance from './axiosInstance';

const requestURL = "/api/nodeInfo";

export const fetchNodes = async () => {
    const response = await axiosInstance.get(requestURL);
    return response.data;
};

export const createNode = async (nodeAddress,location,latitude,longitude) => {
  const requestBody = {
    nodeAddress,
    location,
    latitude,
    longitude,
  };

  const response = await axiosInstance.post(requestURL, requestBody);

  return response.data;
};

export const updateNode = async (id, nodeAddress, location, latitude, longitude) => { 
  const requestBody = {
    id,
    nodeAddress,
    location,
    latitude,
    longitude,
  };

  console.log("asdf", requestBody);
  const response = await axiosInstance.put(requestURL, requestBody);

  return response.data;
};

export const deleteNode = async (id) => {
  const requestBody = {
    data: {
      id,
    }
  };

  const response = await axiosInstance.delete(requestURL, requestBody);

  return response.data;
};
