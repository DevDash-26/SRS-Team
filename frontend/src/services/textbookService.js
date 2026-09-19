import api from "./api";

export const getTextbooks = () =>
  api.get("/textbooks").then((res) => res.data);

export const listTextbook = (payload) =>
  api.post("/textbooks", payload).then((res) => res.data);
