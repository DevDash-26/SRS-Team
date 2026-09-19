import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import RoomCard from "../components/booking/RoomCard";
import BookingForm from "../components/booking/BookingForm";
import { useFetch } from "../hooks/useFetch";
import { getRooms } from "../services/roomService";
import { getMyBookings, createBooking } from "../services/bookingService";

export default function RoomBooking() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { data: rooms, loading, error } = useFetch(getRooms, []);
  const { data: bookings, refetch: refetchBookings } = useFetch(getMyBookings, []);

  const handleBook = async (payload) => {
    await createBooking(payload);
    refetchBookings();
  };

  return (
    <Layout title="Room Booking">
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5 }}>Available rooms</div>
          {loading && <Loader label="Loading rooms..." />}
          {error && <div className="error-text">{error}</div>}
          {rooms?.map((room) => (
            <RoomCard key={room._id} room={room} selected={selectedRoom?._id === room._id} onSelect={setSelectedRoom} />
          ))}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <BookingForm room={selectedRoom} onSubmit={handleBook} />
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 10 }}>My bookings</div>
            {(!bookings || bookings.length === 0) && <div className="muted">No bookings yet.</div>}
            {bookings?.map((b) => (
              <div key={b._id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F0EFEA" }}>
                <div style={{ fontSize: 12.5 }}>{b.roomName || b.roomId} &middot; {b.date}, {b.timeSlot}</div>
                <span className={b.status === "approved" ? "badge badge-green" : "badge badge-amber"}>
                  {(b.status || "pending").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
