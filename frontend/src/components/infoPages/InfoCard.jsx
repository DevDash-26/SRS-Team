export default function InfoCard({ item, onDelete }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
        {onDelete && (
          <button className="btn btn-outline" style={{ height: 28, fontSize: 11, padding: "0 10px", flexShrink: 0 }} onClick={() => onDelete(item._id)}>
            Delete
          </button>
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
