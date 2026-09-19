import api from "./api";

export const getUsers = () =>
  api.get("/users").then((res) => res.data);

export const createUser = (payload) =>
  api.post("/users", payload).then((res) => res.data);
