import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useFetch } from "../hooks/useFetch";
import { getMySupportRequests, createSupportRequest } from "../services/supportRequestService";

export default function AcademicSupport() {
  const { data, loading, error, refetch } = useFetch(getMySupportRequests, []);
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setSubmitting(true);
    try {
      await createSupportRequest({ topic, details });
      setTopic(""); setDetails("");
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Academic Support">
      <div style={{ display: "flex", gap: 20 }}>
        <form className="card" style={{ width: 380 }} onSubmit={handleSubmit}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Request support</div>
          <div className="form-group">
            <label>Topic</label>
            <input className="input" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Data Structures tutoring" />
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea className="input" rows={3} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="What do you need help with?" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit request"}
          </button>
        </form>

        <div style={{ flex: 1 }}>
          {loading && <Loader label="Loading your requests..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && <div className="muted">No support requests yet.</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data?.map((r) => (
              <div key={r._id} className="card">
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.topic}</div>
                <div className="muted" style={{ marginTop: 4 }}>{r.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
