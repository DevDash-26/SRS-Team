import { Link, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import InfoCard from "../components/infoPages/InfoCard";
import InfoEntryForm from "../components/infoPages/InfoEntryForm";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getInfoByCategory, createInfoContent, deleteInfoContent } from "../services/infoContentService";
import { getInfoCategory } from "../utils/infoCategories";

export default function InfoPage() {
  const { category } = useParams();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(() => getInfoByCategory(category), [category]);
  const meta = getInfoCategory(category);
  const title = meta?.label || category;
  // Every role except students maintains the content they are responsible for
  const canManage = Boolean(user?.role) && user.role !== "student";

  const handleCreate = async (payload) => {
    await createInfoContent(category, payload);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteInfoContent(id);
    refetch();
  };

  return (
    <Layout title={title}>
      <div style={{ marginBottom: 16 }}>
        <Link to="/info" className="muted" style={{ fontSize: 12.5 }}>&larr; All info &amp; resources</Link>
        {meta?.description && <div className="muted" style={{ marginTop: 6 }}>{meta.description}</div>}
      </div>

      {canManage && (
        <div style={{ marginBottom: 20, maxWidth: 420 }}>
          <InfoEntryForm onSubmit={handleCreate} categoryLabel={title} />
        </div>
      )}
      {loading && <Loader label={`Loading ${title}...`} />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">Nothing published here yet.</div>}
      <div className="grid grid-2">
        {data?.map((item) => (
          <InfoCard key={item._id} item={item} onDelete={canManage ? handleDelete : undefined} onUpdated={refetch} />
        ))}
      </div>
    </Layout>
  );
}
