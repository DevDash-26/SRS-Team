import api from "./api";

export const getItems = () =>
  api.get("/lost-found").then((res) => res.data);

export const reportItem = (formData) =>
  api.post("/lost-found", formData).then((res) => res.data);
