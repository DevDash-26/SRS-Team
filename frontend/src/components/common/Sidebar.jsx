import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/announcements", label: "Announcements" },
  { to: "/events", label: "Events" },
  { to: "/societies", label: "Societies" },
  { to: "/lost-found", label: "Lost & Found" },
  { to: "/room-booking", label: "Room Booking" },
  { to: "/academic-support", label: "Academic Support" },
  { to: "/assistant", label: "Ask Assistant" },
  { to: "/facility-issues", label: "Facility Issues" },
  { to: "/textbook-exchange", label: "Textbook Exchange" },
  { to: "/feedback", label: "Feedback" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const isStaff = user?.role && user.role !== "student";

  return (
    <div className="sidebar">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            color: "#D6201A",
            flexShrink: 0,
          }}
        >
          U
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>UCL Campus</div>
          <div style={{ fontSize: 9, color: "#A99B98" }}>Universal College Lanka</div>
        </div>
      </div>

      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
            {l.label}
          </NavLink>
        ))}
        {isStaff && (
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
            Content Management
          </NavLink>
        )}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.09)" }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name || "Guest"}</div>
        <div style={{ fontSize: 11, color: "#A99B98", marginBottom: 10, textTransform: "capitalize" }}>
          {user?.role || ""}
        </div>
        <button className="btn btn-outline" style={{ width: "100%", height: 34, fontSize: 12 }} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
