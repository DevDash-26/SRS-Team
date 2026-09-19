import { useState } from "react";

export default function InfoEntryForm({ onSubmit, categoryLabel, showDate = true }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !body.trim()) {
      setError("A title and details are both required.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), date: date || undefined, body: body.trim() });
      setTitle(""); setDate(""); setBody("");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not publish this entry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>Publish to {categoryLabel}</div>
      {error && <div className="error-text" style={{ marginBottom: 10 }}>{error}</div>}
      <div className="form-group">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Semester 1 exams begin" />
      </div>
      {showDate && (
        <div className="form-group">
          <label>Date (optional)</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}
      <div className="form-group">
        <label>Details</label>
        <textarea className="input" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="What should students know?" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Publishing..." : "Publish entry"}
      </button>
    </form>
  );
}
