import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import { useAuth } from "../hooks/useAuth";

const cards = [
  { to: "/announcements", label: "Announcements", desc: "Faculty and university-wide updates, filtered for you." },
  { to: "/info/calendar", label: "Academic Calendar", desc: "Key term dates, exams and deadlines." },
  { to: "/events", label: "Events", desc: "University and society events. Mark your interest." },
  { to: "/societies", label: "Societies", desc: "Discover and join student societies." },
  { to: "/lost-found", label: "Lost & Found", desc: "Report or search for lost campus items." },
  { to: "/room-booking", label: "Room Booking", desc: "Check availability and request a study room." },
  { to: "/assistant", label: "Ask Assistant", desc: "Ask a question instead of searching manually." },
  { to: "/info", label: "Info & Resources", desc: "FAQ, jobs, wellbeing, library, dining and more." },
  { to: "/academic-support", label: "Academic Support", desc: "Request a study group, tutoring or mentorship." },
  { to: "/facility-issues", label: "Facility Issues", desc: "Report a maintenance or facility problem." },
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <Layout title="Dashboard">
      <div style={{ fontSize: 21, fontWeight: 800, marginBottom: 4 }}>Welcome back, {user?.name || "there"}</div>
      <div className="muted" style={{ marginBottom: 20 }}>Here's everything happening across campus today.</div>
      <div className="grid grid-3">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="card" style={{ display: "block", color: "inherit" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
            <div className="muted" style={{ fontSize: 12.5 }}>{c.desc}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
