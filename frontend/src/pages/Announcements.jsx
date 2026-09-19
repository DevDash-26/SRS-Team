import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import AnnouncementCard from "../components/announcements/AnnouncementCard";
import AnnouncementForm from "../components/announcements/AnnouncementForm";
import { useFetch } from "../hooks/useFetch";
import { getAnnouncements, createAnnouncement } from "../services/announcementService";
import { useAuth } from "../hooks/useAuth";

export default function Announcements() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(getAnnouncements, []);
  const canPost = user?.role && user.role !== "student";

  const handleCreate = async (payload) => {
    await createAnnouncement(payload);
    refetch();
  };

  return (
    <Layout title="Announcements">
      {canPost && <div style={{ marginBottom: 20 }}><AnnouncementForm onSubmit={handleCreate} /></div>}
      {loading && <Loader label="Loading announcements..." />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">No announcements yet.</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data?.map((a) => <AnnouncementCard key={a._id} announcement={a} />)}
      </div>
    </Layout>
  );
}
