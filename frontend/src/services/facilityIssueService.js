import api from "./api";

export const getFacilityIssues = () =>
  api.get("/facility-issues").then((res) => res.data);

export const reportFacilityIssue = (payload) =>
  api.post("/facility-issues", payload).then((res) => res.data);
