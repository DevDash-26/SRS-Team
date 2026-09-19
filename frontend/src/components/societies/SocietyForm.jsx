import { useState } from "react";

export default function SocietyForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, description });
      setName(""); setDescription("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New society</div>
      <div className="form-group">
        <label>Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Robotics Society" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this society do?" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create society"}
      </button>
    </form>
  );
}
