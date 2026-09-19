import { useState } from "react";

export default function BookingForm({ room, onSubmit }) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!room) {
    return <div className="card muted">Select a room on the left to request a booking.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !timeSlot) return;
    setSubmitting(true);
    try {
      await onSubmit({ roomId: room._id, date, timeSlot, purpose });
      setDate(""); setTimeSlot(""); setPurpose("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700 }}>Book {room.name}</div>
      <div className="muted" style={{ marginBottom: 14 }}>Capacity {room.capacity} {room.location ? `· ${room.location}` : ""}</div>
      <div className="grid grid-2">
        <div className="form-group">
          <label>Date</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Time slot</label>
          <input className="input" placeholder="e.g. 2:00 PM - 4:00 PM" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label>Purpose</label>
        <input className="input" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Final-year project group work" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Requesting..." : "Request booking"}
      </button>
    </form>
  );
}
