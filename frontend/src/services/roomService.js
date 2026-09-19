import api from "./api";

export const getRooms = () =>
  api.get("/rooms").then((res) => res.data);
