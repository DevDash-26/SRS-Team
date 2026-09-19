export default function AnnouncementCard({ announcement }) {
  const isUrgent = announcement.type === "emergency";
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: 14,
        background: isUrgent ? "#FEF6EC" : "#fff",
        borderColor: isUrgent ? "#F3D9AE" : undefined,
      }}
    >
      <div style={{ width: 6, borderRadius: 3, background: isUrgent ? "#D97706" : "#D6201A", flexShrink: 0 }}></div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{announcement.title}</div>
          {isUrgent && <span className="badge badge-amber">URGENT</span>}
        </div>
        <div className="muted" style={{ marginTop: 4 }}>{announcement.message}</div>
        <div className="muted" style={{ fontSize: 11.5, marginTop: 8 }}>
          {announcement.audience || "University-wide"}
          {announcement.createdAt ? ` · ${new Date(announcement.createdAt).toLocaleDateString()}` : ""}
        </div>
      </div>
    </div>
  );
}
