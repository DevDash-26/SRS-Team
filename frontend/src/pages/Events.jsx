import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import EventCard from "../components/events/EventCard";
import EventForm from "../components/events/EventForm";
import { useFetch } from "../hooks/useFetch";
import { getEvents, createEvent } from "../services/eventService";
import { useAuth } from "../hooks/useAuth";

export default function Events() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(getEvents, []);
  const canPost = user?.role && user.role !== "student";

  const handleCreate = async (payload) => {
    await createEvent(payload);
    refetch();
  };

  return (
    <Layout title="Events">
      {canPost && <div style={{ marginBottom: 20, maxWidth: 420 }}><EventForm onSubmit={handleCreate} /></div>}
      {loading && <Loader label="Loading events..." />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">No events yet.</div>}
      <div className="grid grid-3">
        {data?.map((e) => <EventCard key={e._id} event={e} />)}
      </div>
    </Layout>
  );
}
