import api from "./api";

export const askAssistant = (message) =>
  api.post("/assistant/ask", { message }).then((res) => res.data);
