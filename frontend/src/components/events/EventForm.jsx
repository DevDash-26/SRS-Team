import { useState } from "react";

export default function EventForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState("event");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, date, location, organizer, category });
      setTitle(""); setDate(""); setLocation(""); setOrganizer(""); setCategory("event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New event</div>
      <div className="form-group">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Robotics Society Workshop" />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input className="input" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lab 3" />
      </div>
      <div className="form-group">
        <label>Organiser</label>
        <input className="input" value={organizer} onChange={(e) => setOrganizer(e.target.value)} placeholder="e.g. Robotics Society" />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="event">Event</option>
          <option value="guest-lecture">Guest Lecture</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Publishing..." : "Publish event"}
      </button>
    </form>
  );
}
