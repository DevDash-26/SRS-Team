import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import AnnouncementForm from "../components/announcements/AnnouncementForm";
import EventForm from "../components/events/EventForm";
import SocietyForm from "../components/societies/SocietyForm";
import UserForm from "../components/users/UserForm";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from "../services/announcementService";
import { getEvents, createEvent, deleteEvent } from "../services/eventService";
import { getSocieties, createSociety, deleteSociety } from "../services/societyService";
import { getUsers, createUser } from "../services/userService";

function ManageList({ items, loading, error, onDelete, renderLabel }) {
  if (loading) return <Loader label="Loading..." />;
  if (error) return <div className="error-text">{error}</div>;
  if (!items || items.length === 0) return <div className="muted">Nothing here yet.</div>;
  return (
    <div className="card">
      {items.map((item) => (
        <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F0EFEA" }}>
          <div style={{ fontSize: 13 }}>{renderLabel(item)}</div>
          {onDelete && (
            <button className="btn btn-outline" style={{ height: 30, fontSize: 11.5, padding: "0 10px" }} onClick={() => onDelete(item._id)}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState("announcements");
  const { user } = useAuth();
  const isSystemAdmin = user?.role === "system-admin";

  const announcements = useFetch(getAnnouncements, []);
  const events = useFetch(getEvents, []);
  const societies = useFetch(getSocieties, []);
  const users = useFetch(isSystemAdmin ? getUsers : () => Promise.resolve(null), [isSystemAdmin]);

  return (
    <Layout title="Content Management">
      <div className="tabs">
        <button className={`tab ${tab === "announcements" ? "active" : ""}`} onClick={() => setTab("announcements")}>Announcements</button>
        <button className={`tab ${tab === "events" ? "active" : ""}`} onClick={() => setTab("events")}>Events</button>
        <button className={`tab ${tab === "societies" ? "active" : ""}`} onClick={() => setTab("societies")}>Societies</button>
        {isSystemAdmin && (
          <button className={`tab ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>Users</button>
        )}
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          {tab === "announcements" && (
            <ManageList
              items={announcements.data}
              loading={announcements.loading}
              error={announcements.error}
              onDelete={async (id) => { await deleteAnnouncement(id); announcements.refetch(); }}
              renderLabel={(a) => `${a.title} · ${!a.audienceType || a.audienceType === "university-wide" ? "University-wide" : a.audienceValue}`}
            />
          )}
          {tab === "events" && (
            <ManageList
              items={events.data}
              loading={events.loading}
              error={events.error}
              onDelete={async (id) => { await deleteEvent(id); events.refetch(); }}
              renderLabel={(e) => `${e.title} · ${e.location || ""}`}
            />
          )}
          {tab === "societies" && (
            <ManageList
              items={societies.data}
              loading={societies.loading}
              error={societies.error}
              onDelete={async (id) => { await deleteSociety(id); societies.refetch(); }}
              renderLabel={(s) => s.name}
            />
          )}
          {tab === "users" && isSystemAdmin && (
            <ManageList
              items={users.data}
              loading={users.loading}
              error={users.error}
              renderLabel={(u) => `${u.name} · ${u.email} · ${[u.role, u.faculty, u.programme, u.yearGroup].filter(Boolean).join(" · ")}`}
            />
          )}
        </div>

        <div style={{ width: 360, flexShrink: 0 }}>
          {tab === "announcements" && (
            <AnnouncementForm onSubmit={async (payload) => { await createAnnouncement(payload); announcements.refetch(); }} />
          )}
          {tab === "events" && (
            <EventForm onSubmit={async (payload) => { await createEvent(payload); events.refetch(); }} />
          )}
          {tab === "societies" && (
            <SocietyForm onSubmit={async (payload) => { await createSociety(payload); societies.refetch(); }} />
          )}
          {tab === "users" && isSystemAdmin && (
            <UserForm onSubmit={async (payload) => { await createUser(payload); users.refetch(); }} />
          )}
        </div>
      </div>
    </Layout>
  );
}
