import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getFacilityIssues, reportFacilityIssue } from "../services/facilityIssueService";

export default function FacilityIssues() {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const { data, loading, error, refetch } = useFetch(getFacilityIssues, []);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location) return;
    setSubmitting(true);
    try {
      await reportFacilityIssue({ title, location, description });
      setTitle(""); setLocation(""); setDescription("");
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Facility Issues">
      <div style={{ display: "flex", gap: 20 }}>
        <form className="card" style={{ width: 380 }} onSubmit={handleSubmit}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Report an issue</div>
          <div className="form-group">
            <label>Issue</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Broken projector" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Lecture Hall 2" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit report"}
          </button>
        </form>
        <div style={{ flex: 1 }}>
          <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, marginBottom: 10 }}>
            {isStudent ? "Issues you've reported" : "All reported issues"}
          </div>
          {loading && <Loader label="Loading reported issues..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="muted">{isStudent ? "You haven't reported any issues yet." : "No issues reported yet."}</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data?.map((i) => (
              <div key={i._id} className="card">
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{i.title}</div>
                <div className="muted" style={{ marginTop: 4 }}>{i.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
