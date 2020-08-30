import axios from "axios";

const baseUrl = "/api/packages";

//fetch data from server with axios

const getPackages = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSinglePackage = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updataPackage = async (id, updatedPackage) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPackage);
  return response.data;
};

export { getPackages, getSinglePackage, updataPackage };
