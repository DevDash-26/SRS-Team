import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import ItemCard from "../components/lostfound/ItemCard";
import ReportItemForm from "../components/lostfound/ReportItemForm";
import { useFetch } from "../hooks/useFetch";
import { getItems, reportItem } from "../services/lostFoundService";

export default function LostFound() {
  const [tab, setTab] = useState("browse");
  const { data, loading, error, refetch } = useFetch(getItems, []);

  const handleReport = async (payload) => {
    await reportItem(payload);
    setTab("browse");
    refetch();
  };

  return (
    <Layout title="Lost & Found">
      <div className="tabs">
        <button className={`tab ${tab === "browse" ? "active" : ""}`} onClick={() => setTab("browse")}>Browse items</button>
        <button className={`tab ${tab === "report" ? "active" : ""}`} onClick={() => setTab("report")}>Report item</button>
      </div>

      {tab === "report" ? (
        <div style={{ maxWidth: 420 }}>
          <ReportItemForm onSubmit={handleReport} />
        </div>
      ) : (
        <>
          {loading && <Loader label="Loading items..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && <div className="muted">No items reported yet.</div>}
          <div className="grid grid-4">
            {data?.map((item) => <ItemCard key={item._id} item={item} />)}
          </div>
        </>
      )}
    </Layout>
  );
}
