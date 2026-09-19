export default function ItemCard({ item }) {
  const isLost = item.status === "lost";
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{item.name}</div>
        <span className={isLost ? "badge badge-amber" : "badge badge-green"}>{isLost ? "LOST" : "FOUND"}</span>
      </div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
        {item.location}
        {item.date ? ` · ${new Date(item.date).toLocaleDateString()}` : ""}
      </div>
      {item.description && <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{item.description}</div>}
    </div>
  );
}
