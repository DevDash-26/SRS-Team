export default function InfoCard({ item }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.title}</div>
      <div className="muted" style={{ marginTop: 6 }}>{item.body}</div>
    </div>
  );
}
