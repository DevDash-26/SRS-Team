import { useState } from "react";

// <input type="datetime-local"> needs YYYY-MM-DDTHH:mm in local time
const toDateTimeInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function EventForm({ onSubmit, initialValues, onCancel }) {
  const isEdit = Boolean(initialValues);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [date, setDate] = useState(toDateTimeInput(initialValues?.date));
  const [location, setLocation] = useState(initialValues?.location || "");
  const [organizer, setOrganizer] = useState(initialValues?.organizer || "");
  const [category, setCategory] = useState(initialValues?.category || "event");
  const [guestName, setGuestName] = useState(initialValues?.guestName || "");
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [guestNameDraft, setGuestNameDraft] = useState("");
  const [guestPopupError, setGuestPopupError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (value === "guest-lecture") {
      setGuestNameDraft(guestName);
      setGuestPopupError("");
      setShowGuestPopup(true);
    } else {
      setGuestName("");
    }
  };

  const handleGuestPopupSave = () => {
    if (!guestNameDraft.trim()) {
      setGuestPopupError("Enter the guest lecturer's name.");
      return;
    }
    setGuestName(guestNameDraft.trim());
    setShowGuestPopup(false);
  };

  const handleGuestPopupCancel = () => {
    if (!guestName) setCategory("event");
    setShowGuestPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;
    if (category === "guest-lecture" && !guestName) {
      setGuestNameDraft("");
      setGuestPopupError("");
      setShowGuestPopup(true);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ title, date, location, organizer, category, guestName: category === "guest-lecture" ? guestName : undefined });
      if (!isEdit) {
        setTitle(""); setDate(""); setLocation(""); setOrganizer(""); setCategory("event"); setGuestName("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} style={{ position: "relative" }}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>{isEdit ? "Edit event" : "New event"}</div>
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
        <select className="input" value={category} onChange={handleCategoryChange}>
          <option value="event">Event</option>
          <option value="workshop">Workshop</option>
          <option value="guest-lecture">Guest Lecture</option>
        </select>
      </div>
      {category === "guest-lecture" && guestName && (
        <div className="muted" style={{ fontSize: 12, marginTop: -6, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Guest lecturer: <strong>{guestName}</strong></span>
          <button
            type="button"
            onClick={() => { setGuestNameDraft(guestName); setGuestPopupError(""); setShowGuestPopup(true); }}
            style={{ background: "none", border: "none", padding: 0, color: "var(--red)", cursor: "pointer", font: "inherit", fontWeight: 700 }}
          >
            Edit
          </button>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Publish event"}
        </button>
        {onCancel && (
          <button className="btn btn-outline" style={{ flex: 1 }} type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {showGuestPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(23,24,28,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={handleGuestPopupCancel}
        >
          <div className="card" style={{ width: 320 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Guest lecture details</div>
            <div className="form-group">
              <label>Guest lecturer's name</label>
              <input
                className="input"
                autoFocus
                value={guestNameDraft}
                onChange={(e) => setGuestNameDraft(e.target.value)}
                placeholder="e.g. Dr. Jane Perera"
              />
            </div>
            {guestPopupError && <div className="error-text" style={{ marginBottom: 10 }}>{guestPopupError}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleGuestPopupSave}>
                Save
              </button>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleGuestPopupCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
