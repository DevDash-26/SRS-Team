import api from "./api";

export const getMyBookings = () =>
  api.get("/bookings").then((res) => res.data);

export const createBooking = (payload) =>
  api.post("/bookings", payload).then((res) => res.data);
