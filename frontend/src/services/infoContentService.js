import api from "./api";

export const getInfoByCategory = (category) =>
  api.get(`/info/${category}`).then((res) => res.data);
