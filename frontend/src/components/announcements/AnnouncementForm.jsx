import { useState } from "react";

export default function AnnouncementForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");
  const [type, setType] = useState("general");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    setSubmitting(true);
    try {
      await onSubmit({ title, message, audience, type });
      setTitle("");
      setMessage("");
      setAudience("");
      setType("general");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New announcement</div>
      <div className="form-group">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Guest lecture rescheduled" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea className="input" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write the announcement details..." />
      </div>
      <div className="form-group">
        <label>Audience</label>
        <input className="input" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Software Engineering, Final Year" />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="general">General</option>
          <option value="emergency">Urgent / Emergency</option>
          <option value="schedule-change">Schedule Change</option>
        </select>
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Publishing..." : "Publish announcement"}
      </button>
    </form>
  );
}
