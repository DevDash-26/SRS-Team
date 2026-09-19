import api from "./api";

export const getAnnouncements = () =>
  api.get("/announcements").then((res) => res.data);

export const createAnnouncement = (payload) =>
  api.post("/announcements", payload).then((res) => res.data);

export const deleteAnnouncement = (id) =>
  api.delete(`/announcements/${id}`).then((res) => res.data);
