import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import ItemCard from "../components/lostfound/ItemCard";
import ReportItemForm from "../components/lostfound/ReportItemForm";
import { useFetch } from "../hooks/useFetch";
import { getItems, reportItem } from "../services/lostFoundService";

export default function LostFound() {
  const [tab, setTab] = useState("browse");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  // Only re-queries when a search is actually submitted, so typing stays smooth
  const [query, setQuery] = useState({ q: "", status: "all" });

  const { data, loading, error, refetch } = useFetch(
    () => getItems({ q: query.q || undefined, status: query.status === "all" ? undefined : query.status }),
    [query.q, query.status]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery({ q: search.trim(), status });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("all");
    setQuery({ q: "", status: "all" });
  };

  const handleReport = async (payload) => {
    await reportItem(payload);
    setTab("browse");
    refetch();
  };

  const isFiltered = query.q || query.status !== "all";

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
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16, maxWidth: 620 }}>
            <input
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by item, location or description..."
            />
            <select className="input" style={{ width: 130, flexShrink: 0 }} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
            <button className="btn btn-primary" style={{ flexShrink: 0 }} type="submit">Search</button>
            {isFiltered && (
              <button className="btn btn-outline" style={{ flexShrink: 0 }} type="button" onClick={handleClear}>Clear</button>
            )}
          </form>

          {loading && <Loader label="Loading items..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="muted">{isFiltered ? "No items match your search." : "No items reported yet."}</div>
          )}
          <div className="grid grid-4">
            {data?.map((item) => <ItemCard key={item._id} item={item} />)}
          </div>
        </>
      )}
    </Layout>
  );
}
