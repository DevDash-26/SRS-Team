import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import RoomCard from "../components/booking/RoomCard";
import BookingForm from "../components/booking/BookingForm";
import RoomForm from "../components/booking/RoomForm";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getRooms, createRoom, deleteRoom } from "../services/roomService";
import { getMyBookings, createBooking, getAllBookings, updateBookingStatus } from "../services/bookingService";

function statusBadge(status) {
  if (status === "approved") return "badge badge-green";
  if (status === "rejected") return "badge badge-red";
  return "badge badge-amber";
}

export default function RoomBooking() {
  const [tab, setTab] = useState("book");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user } = useAuth();
  const canManage = user?.role === "administrative" || user?.role === "system-admin";

  const { data: rooms, loading, error, refetch: refetchRooms } = useFetch(getRooms, []);
  const { data: bookings, refetch: refetchBookings } = useFetch(getMyBookings, []);
  const allBookings = useFetch(canManage ? getAllBookings : () => Promise.resolve(null), [canManage]);

  const handleBook = async (payload) => {
    await createBooking(payload);
    refetchBookings();
  };

  const handleDecision = async (id, status) => {
    await updateBookingStatus(id, status);
    allBookings.refetch();
    refetchBookings();
  };

  const handleAddRoom = async (payload) => {
    await createRoom(payload);
    refetchRooms();
  };

  const handleDeleteRoom = async (id) => {
    await deleteRoom(id);
    refetchRooms();
  };

  return (
    <Layout title="Room Booking">
      {canManage && (
        <div className="tabs">
          <button className={`tab ${tab === "book" ? "active" : ""}`} onClick={() => setTab("book")}>Book a room</button>
          <button className={`tab ${tab === "manage" ? "active" : ""}`} onClick={() => setTab("manage")}>Manage bookings & rooms</button>
        </div>
      )}

      {tab === "book" && (
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
                  <span className={statusBadge(b.status)}>{(b.status || "pending").toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "manage" && canManage && (
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 10 }}>All bookings</div>
              {allBookings.loading && <Loader label="Loading bookings..." />}
              {allBookings.error && <div className="error-text">{allBookings.error}</div>}
              {!allBookings.loading && (!allBookings.data || allBookings.data.length === 0) && (
                <div className="muted">No bookings yet.</div>
              )}
              {allBookings.data?.map((b) => (
                <div key={b._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0EFEA" }}>
                  <div style={{ fontSize: 12.5 }}>
                    {b.roomName} &middot; {b.userName} &middot; {b.date}, {b.timeSlot}
                  </div>
                  {b.status === "pending" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-primary" style={{ height: 30, fontSize: 11.5, padding: "0 10px" }} onClick={() => handleDecision(b._id, "approved")}>
                        Approve
                      </button>
                      <button className="btn btn-outline" style={{ height: 30, fontSize: 11.5, padding: "0 10px" }} onClick={() => handleDecision(b._id, "rejected")}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className={statusBadge(b.status)}>{b.status.toUpperCase()}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <RoomForm onSubmit={handleAddRoom} />
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Rooms</div>
              {(!rooms || rooms.length === 0) && <div className="muted">No rooms yet.</div>}
              {rooms?.map((room) => (
                <div key={room._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0EFEA" }}>
                  <div style={{ fontSize: 13 }}>{room.name} &middot; Capacity {room.capacity}</div>
                  <button className="btn btn-outline" style={{ height: 30, fontSize: 11.5, padding: "0 10px" }} onClick={() => handleDeleteRoom(room._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
