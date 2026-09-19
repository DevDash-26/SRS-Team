import api from "./api";

export const getInfoByCategory = (category) =>
  api.get(`/info/${category}`).then((res) => res.data);

export const createInfoContent = (category, payload) =>
  api.post(`/info/${category}`, payload).then((res) => res.data);

export const updateInfoContent = (id, payload) =>
  api.put(`/info/${id}`, payload).then((res) => res.data);

export const deleteInfoContent = (id) =>
  api.delete(`/info/${id}`).then((res) => res.data);
