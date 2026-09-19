import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import uclLogo from "../../assets/ucl-logo.png";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/announcements", label: "Announcements" },
  { to: "/info/calendar", label: "Academic Calendar" },
  { to: "/events", label: "Events" },
  { to: "/societies", label: "Societies" },
  { to: "/lost-found", label: "Lost & Found" },
  { to: "/room-booking", label: "Room Booking", roles: ["student", "academic", "administrative", "system-admin"] },
  { to: "/academic-support", label: "Academic Support" },
  { to: "/assistant", label: "Ask Assistant" },
  { to: "/facility-issues", label: "Facility Issues" },
  { to: "/textbook-exchange", label: "Textbook Exchange" },
  { to: "/feedback", label: "Feedback" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const isStaff = user?.role && user.role !== "student";
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img src={uclLogo} alt="UCL logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>UCL Campus</div>
          <div style={{ fontSize: 9, color: "#A99B98" }}>Universal College Lanka</div>
        </div>
      </div>

      <nav>
        {links.filter((l) => !l.roles || l.roles.includes(user?.role)).map((l) => (
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
        <button className="btn btn-outline" style={{ width: "100%", height: 34, fontSize: 12 }} onClick={() => setShowLogoutConfirm(true)}>
          Log out
        </button>
      </div>

      {showLogoutConfirm && (
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
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div className="card" style={{ width: 300, color: "var(--text)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Log out</div>
            <div className="muted" style={{ marginBottom: 16 }}>Are you sure you want to log out?</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={logout}>
                Log out
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
