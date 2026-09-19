import api from "./api";

export const getEvents = () =>
  api.get("/events").then((res) => res.data);

export const createEvent = (payload) =>
  api.post("/events", payload).then((res) => res.data);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then((res) => res.data);
