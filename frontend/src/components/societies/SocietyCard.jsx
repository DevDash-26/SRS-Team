import { useState } from "react";
import { joinSociety } from "../../services/societyMembershipService";
import { updateSociety } from "../../services/societyService";

export default function SocietyCard({ society, canEdit, onUpdated }) {
  const [joined, setJoined] = useState(!!society.joined);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(society.name);
  const [description, setDescription] = useState(society.description || "");
  const [saving, setSaving] = useState(false);

  const handleJoin = async () => {
    setBusy(true);
    try {
      await joinSociety(society._id);
      setJoined(true);
    } catch {
      // Backend may not be connected yet
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await updateSociety(society._id, { name: name.trim(), description });
      setEditing(false);
      onUpdated?.();
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <form className="card" onSubmit={handleSave}>
        <div className="form-group">
          <label>Name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="btn btn-outline"
            style={{ flex: 1 }}
            type="button"
            onClick={() => { setEditing(false); setName(society.name); setDescription(society.description || ""); }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{society.name}</div>
        {canEdit && (
          <button
            className="btn btn-outline"
            style={{ height: 26, fontSize: 11, padding: "0 8px", flexShrink: 0 }}
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="muted" style={{ marginTop: 4 }}>{society.description}</div>
      <button
        className={joined ? "btn btn-primary" : "btn btn-outline"}
        style={{ marginTop: 12, width: "100%" }}
        onClick={handleJoin}
        disabled={busy || joined}
      >
        {joined ? "Joined" : "Join society"}
      </button>
    </div>
  );
}
