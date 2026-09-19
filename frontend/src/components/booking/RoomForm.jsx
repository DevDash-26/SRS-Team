import { useState } from "react";

export default function RoomForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !capacity) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, capacity: Number(capacity), location });
      setName(""); setCapacity(""); setLocation("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New room</div>
      <div className="form-group">
        <label>Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Room 204" />
      </div>
      <div className="form-group">
        <label>Capacity</label>
        <input className="input" type="number" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g. 30" />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Block B, 2nd floor" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add room"}
      </button>
    </form>
  );
}
