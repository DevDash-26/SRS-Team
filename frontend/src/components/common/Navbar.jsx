export default function Navbar({ title }) {
  return (
    <div className="topbar">
      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>{title}</div>
    </div>
  );
}
