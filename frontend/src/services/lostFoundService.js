import api from "./api";

export const getItems = () =>
  api.get("/lost-found").then((res) => res.data);

export const reportItem = (payload) =>
  api.post("/lost-found", payload).then((res) => res.data);
