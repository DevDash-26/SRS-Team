import { useState } from "react";
import { toggleInterest } from "../../services/eventInterestService";

export default function EventCard({ event }) {
  const [interested, setInterested] = useState(!!event.interested);
  const [count, setCount] = useState(event.interestCount || 0);
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    setBusy(true);
    try {
      await toggleInterest(event._id);
      setInterested((v) => !v);
      setCount((c) => (interested ? Math.max(0, c - 1) : c + 1));
    } catch {
      // Backend may not be connected yet — fail quietly in the demo
    } finally {
      setBusy(false);
    }
  };

  const CATEGORY_LABELS = { event: "Event", workshop: "Workshop", "guest-lecture": "Guest Lecture" };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{event.title}</div>
        {event.category && event.category !== "event" && (
          <span className="badge badge-amber">{CATEGORY_LABELS[event.category] || event.category}</span>
        )}
      </div>
      <div className="muted" style={{ marginTop: 4 }}>
        {event.date ? new Date(event.date).toLocaleDateString() : "Date TBC"}
        {event.location ? ` · ${event.location}` : ""}
      </div>
      {event.organizer && <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Organised by {event.organizer}</div>}
      {event.category === "guest-lecture" && event.guestName && (
        <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>Guest lecturer: {event.guestName}</div>
      )}
      <button
        className={interested ? "btn btn-primary" : "btn btn-outline"}
        style={{ marginTop: 12, width: "100%" }}
        onClick={handleClick}
        disabled={busy}
      >
        {interested ? "Interested" : "I'm interested"} · {count}
      </button>
    </div>
  );
}
