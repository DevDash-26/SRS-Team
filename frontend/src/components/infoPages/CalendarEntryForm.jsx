import { useState } from "react";

export default function CalendarEntryForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, date, body });
      setTitle(""); setDate(""); setBody("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New calendar entry</div>
      <div className="form-group">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Semester 1 Exams begin" />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Details</label>
        <textarea className="input" rows={2} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Any additional details" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add to calendar"}
      </button>
    </form>
  );
}
