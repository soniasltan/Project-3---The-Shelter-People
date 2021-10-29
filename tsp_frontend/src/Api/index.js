import axios from "axios";

const api = axios.create({
  // refer https://axios-http.com/docs/instance
  baseURL: "http://localhost:3000/api",
});

export const insertCat = (payload) => api.post(`/cats`, payload);
export const getAllCats = () => api.get(`/cats`);
export const updateCatById = (id, payload) => api.put(`/cats/${id}`, payload);
export const deleteCatById = (id) => api.delete(`/cats/${id}`);
export const getCatById = (id) => api.get(`/cats/${id}`);

const apis = {
  insertCat,
  getAllCats,
  updateCatById,
  deleteCatById,
  getCatById,
};

export default apis;
