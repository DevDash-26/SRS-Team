import api from "./api";

export const getSocieties = () =>
  api.get("/societies").then((res) => res.data);

export const createSociety = (payload) =>
  api.post("/societies", payload).then((res) => res.data);

export const updateSociety = (id, payload) =>
  api.put(`/societies/${id}`, payload).then((res) => res.data);

export const deleteSociety = (id) =>
  api.delete(`/societies/${id}`).then((res) => res.data);
