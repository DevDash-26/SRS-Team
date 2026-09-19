import api from "./api";

export const submitFeedback = (payload) =>
  api.post("/feedback", payload).then((res) => res.data);

export const getFeedback = () =>
  api.get("/feedback").then((res) => res.data);

export const respondToFeedback = (id, payload) =>
  api.patch(`/feedback/${id}`, payload).then((res) => res.data);
