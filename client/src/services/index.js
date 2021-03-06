import axios from "axios";

const baseUrl = "/api/packages";

//query data from server with axios

const getPackages = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSinglePackage = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updatePackage = async (id, updatedPackage) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPackage);
  return response.data;
};

export { getPackages, getSinglePackage, updatePackage };
