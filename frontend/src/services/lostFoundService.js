import api from "./api";

export const getItems = (params = {}) =>
  api.get("/lost-found", { params }).then((res) => res.data);

export const reportItem = (formData) =>
  api.post("/lost-found", formData).then((res) => res.data);
