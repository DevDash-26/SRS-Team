export default function RoomCard({ room, selected, onSelect }) {
  return (
    <div
      className="card"
      onClick={() => onSelect(room)}
      style={{ cursor: "pointer", borderColor: selected ? "#D6201A" : undefined, borderWidth: selected ? 2 : 1 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{room.name}</div>
        <span className={room.available ? "badge badge-green" : "badge badge-amber"}>
          {room.available ? "AVAILABLE" : "BUSY"}
        </span>
      </div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
        Capacity {room.capacity} {room.location ? `· ${room.location}` : ""}
      </div>
    </div>
  );
}
