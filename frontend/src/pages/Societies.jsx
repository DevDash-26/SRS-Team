import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import SocietyCard from "../components/societies/SocietyCard";
import SocietyForm from "../components/societies/SocietyForm";
import { useFetch } from "../hooks/useFetch";
import { getSocieties, createSociety } from "../services/societyService";
import { useAuth } from "../hooks/useAuth";

export default function Societies() {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(getSocieties, []);
  const canPost = user?.role === "society" || user?.role === "system-admin";

  const handleCreate = async (payload) => {
    await createSociety(payload);
    refetch();
  };

  return (
    <Layout title="Societies">
      {canPost && <div style={{ marginBottom: 20, maxWidth: 420 }}><SocietyForm onSubmit={handleCreate} /></div>}
      {loading && <Loader label="Loading societies..." />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">No societies listed yet.</div>}
      <div className="grid grid-3">
        {data?.map((s) => <SocietyCard key={s._id} society={s} canEdit={canPost} onUpdated={refetch} />)}
      </div>
    </Layout>
  );
}
