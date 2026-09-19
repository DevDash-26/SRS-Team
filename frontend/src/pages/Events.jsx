import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import EventCard from "../components/events/EventCard";
import EventForm from "../components/events/EventForm";
import { useFetch } from "../hooks/useFetch";
import { getEvents, createEvent } from "../services/eventService";
import { useAuth } from "../hooks/useAuth";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "event", label: "Events" },
  { value: "workshop", label: "Workshops" },
  { value: "guest-lecture", label: "Guest Lectures" },
];

export default function Events() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(getEvents, []);
  const canPost = user?.role && user.role !== "student";
  const [filter, setFilter] = useState("all");

  const handleCreate = async (payload) => {
    await createEvent(payload);
    refetch();
  };

  // Guest lectures and workshops stay findable separately from regular campus events
  const visible = data?.filter((e) => filter === "all" || (e.category || "event") === filter);

  return (
    <Layout title="Events">
      {canPost && <div style={{ marginBottom: 20, maxWidth: 420 }}><EventForm onSubmit={handleCreate} /></div>}

      <div className="tabs">
        {FILTERS.map((f) => (
          <button key={f.value} className={`tab ${filter === f.value ? "active" : ""}`} onClick={() => setFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      {loading && <Loader label="Loading events..." />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!visible || visible.length === 0) && (
        <div className="muted">{filter === "all" ? "No events yet." : "Nothing in this category yet."}</div>
      )}
      <div className="grid grid-3">
        {visible?.map((e) => <EventCard key={e._id} event={e} />)}
      </div>
    </Layout>
  );
}
