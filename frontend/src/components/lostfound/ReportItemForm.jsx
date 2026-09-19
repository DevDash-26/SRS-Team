import { useState } from "react";

export default function ReportItemForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, status, location, description });
      setName(""); setStatus("lost"); setLocation(""); setDescription("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>Report an item</div>
      <div className="form-group">
        <label>Item name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Black backpack" />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Near Library" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="input" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Any identifying details" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit report"}
      </button>
    </form>
  );
}
