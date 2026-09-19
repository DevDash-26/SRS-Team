import { useState } from "react";
import { joinSociety } from "../../services/societyMembershipService";

export default function SocietyCard({ society }) {
  const [joined, setJoined] = useState(!!society.joined);
  const [busy, setBusy] = useState(false);

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

  return (
    <div className="card">
      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{society.name}</div>
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
