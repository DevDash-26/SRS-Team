import api from "./api";

export const joinSociety = (societyId) =>
  api.post(`/societies/${societyId}/join`).then((res) => res.data);
