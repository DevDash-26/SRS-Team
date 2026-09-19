import api from "./api";

export const submitFeedback = (payload) =>
  api.post("/feedback", payload).then((res) => res.data);
