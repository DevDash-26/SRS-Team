import api from "./api";

export const getMyBookings = () =>
  api.get("/bookings").then((res) => res.data);

export const createBooking = (payload) =>
  api.post("/bookings", payload).then((res) => res.data);

export const getAllBookings = () =>
  api.get("/bookings/all").then((res) => res.data);

export const updateBookingStatus = (id, status) =>
  api.patch(`/bookings/${id}/status`, { status }).then((res) => res.data);
