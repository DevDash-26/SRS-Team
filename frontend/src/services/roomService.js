import api from "./api";

export const getRooms = () =>
  api.get("/rooms").then((res) => res.data);

export const createRoom = (payload) =>
  api.post("/rooms", payload).then((res) => res.data);

export const deleteRoom = (id) =>
  api.delete(`/rooms/${id}`).then((res) => res.data);
