import api from "./api";

export const getMySupportRequests = () =>
  api.get("/support-requests").then((res) => res.data);

export const createSupportRequest = (payload) =>
  api.post("/support-requests", payload).then((res) => res.data);
