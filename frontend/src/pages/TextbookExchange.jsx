import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useFetch } from "../hooks/useFetch";
import { getTextbooks, listTextbook } from "../services/textbookService";

export default function TextbookExchange() {
  const { data, loading, error, refetch } = useFetch(getTextbooks, []);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    setSubmitting(true);
    try {
      await listTextbook({ title, subject, price });
      setTitle(""); setSubject(""); setPrice("");
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Textbook Exchange">
      <div style={{ display: "flex", gap: 20 }}>
        <form className="card" style={{ width: 380 }} onSubmit={handleSubmit}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>List a textbook</div>
          <div className="form-group">
            <label>Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Subject / Module</label>
            <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Price (optional)</label>
            <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. Free, or Rs. 500" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Listing..." : "List textbook"}
          </button>
        </form>
        <div style={{ flex: 1 }}>
          {loading && <Loader label="Loading listings..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && <div className="muted">No textbooks listed yet.</div>}
          <div className="grid grid-3">
            {data?.map((t) => (
              <div key={t._id} className="card">
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{t.title}</div>
                <div className="muted" style={{ marginTop: 4 }}>{t.subject}</div>
                {t.price && <div style={{ marginTop: 6, fontWeight: 600, fontSize: 12.5 }}>{t.price}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
