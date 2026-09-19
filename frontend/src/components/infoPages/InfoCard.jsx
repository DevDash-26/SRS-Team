import { useState } from "react";
import { updateInfoContent } from "../../services/infoContentService";

// Dates come back as ISO strings; <input type="date"> needs yyyy-mm-dd
const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

export default function InfoCard({ item, onDelete, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [date, setDate] = useState(toDateInput(item.date));
  const [body, setBody] = useState(item.body || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canManage = Boolean(onDelete);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !body.trim()) {
      setError("A title and details are both required.");
      return;
    }
    setSaving(true);
    try {
      await updateInfoContent(item._id, { title: title.trim(), body: body.trim(), date: date || undefined });
      setEditing(false);
      onUpdated?.();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not save this entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(item.title);
    setDate(toDateInput(item.date));
    setBody(item.body || "");
    setError("");
    setEditing(false);
  };

  if (editing) {
    return (
      <form className="card" onSubmit={handleSave}>
        {error && <div className="error-text" style={{ marginBottom: 10 }}>{error}</div>}
        <div className="form-group">
          <label>Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date (optional)</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Details</label>
          <textarea className="input" rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button className="btn btn-outline" style={{ flex: 1 }} type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
        {canManage && (
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button className="btn btn-outline" style={{ height: 28, fontSize: 11, padding: "0 10px" }} onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="btn btn-outline" style={{ height: 28, fontSize: 11, padding: "0 10px" }} onClick={() => onDelete(item._id)}>
              Delete
            </button>
          </div>
        )}
      </div>
      {item.date && (
        <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
          {new Date(item.date).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
        </div>
      )}
      <div className="muted" style={{ marginTop: 6 }}>{item.body}</div>
    </div>
  );
}
