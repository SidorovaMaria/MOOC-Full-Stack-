import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status;
  } catch (error) {
    console.error(
      "Failed to delete blog:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error to be handled by the caller
  }
};
export default { getAll, setToken, create, update, deleteBlog };
