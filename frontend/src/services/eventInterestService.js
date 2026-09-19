import api from "./api";

export const toggleInterest = (eventId) =>
  api.post(`/events/${eventId}/interest`).then((res) => res.data);
