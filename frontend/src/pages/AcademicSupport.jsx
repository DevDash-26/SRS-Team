import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import {
  getMySupportRequests,
  createSupportRequest,
  getAllSupportRequests,
  updateSupportRequest,
} from "../services/supportRequestService";

const SUPPORT_TYPES = [
  { value: "study-group", label: "Study group" },
  { value: "peer-tutoring", label: "Peer tutoring" },
  { value: "mentorship", label: "Mentorship" },
  { value: "other", label: "Other" },
];

const typeLabel = (value) => SUPPORT_TYPES.find((t) => t.value === value)?.label || "Other";

const statusBadge = (status) => {
  if (status === "resolved") return "badge badge-green";
  if (status === "in-progress") return "badge badge-amber";
  return "badge badge-red";
};

function StaffRequestItem({ request, onUpdated }) {
  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);

  const respond = async (status) => {
    setSaving(true);
    try {
      await updateSupportRequest(request._id, { status, response: reply.trim() || undefined });
      setReply("");
      onUpdated();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{request.topic}</div>
        <span className={statusBadge(request.status)}>{(request.status || "open").toUpperCase()}</span>
      </div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>
        {typeLabel(request.type)} · {request.user?.name || "Student"}
        {request.user?.programme ? ` · ${request.user.programme}` : ""}
        {request.user?.yearGroup ? ` · ${request.user.yearGroup}` : ""}
      </div>
      {request.details && <div className="muted" style={{ marginTop: 6 }}>{request.details}</div>}
      {request.response && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0EFEA" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Staff response</div>
          <div className="muted" style={{ marginTop: 4 }}>{request.response}</div>
        </div>
      )}
      {request.status !== "resolved" && (
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <input className="input" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Reply to the student..." />
          <button className="btn btn-outline" style={{ flexShrink: 0, padding: "0 12px" }} onClick={() => respond("in-progress")} disabled={saving}>
            Picked up
          </button>
          <button className="btn btn-primary" style={{ flexShrink: 0, padding: "0 12px" }} onClick={() => respond("resolved")} disabled={saving}>
            Resolve
          </button>
        </div>
      )}
    </div>
  );
}

export default function AcademicSupport() {
  const { user } = useAuth();
  const canHandle = ["academic", "administrative", "system-admin"].includes(user?.role);

  const mine = useFetch(getMySupportRequests, []);
  const all = useFetch(canHandle ? getAllSupportRequests : () => Promise.resolve(null), [canHandle]);

  const [topic, setTopic] = useState("");
  const [type, setType] = useState(SUPPORT_TYPES[0].value);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setSubmitting(true);
    try {
      await createSupportRequest({ topic: topic.trim(), type, details });
      setTopic(""); setType(SUPPORT_TYPES[0].value); setDetails("");
      mine.refetch();
      if (canHandle) all.refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Academic Support">
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <form className="card" style={{ width: 380, flexShrink: 0 }} onSubmit={handleSubmit}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Request support</div>
          <div className="form-group">
            <label>What do you need?</label>
            <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
              {SUPPORT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
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

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, marginBottom: 10 }}>
              Your requests
            </div>
            {mine.loading && <Loader label="Loading your requests..." />}
            {mine.error && <div className="error-text">{mine.error}</div>}
            {!mine.loading && !mine.error && (!mine.data || mine.data.length === 0) && (
              <div className="muted">No support requests yet.</div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mine.data?.map((r) => (
                <div key={r._id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.topic}</div>
                    <span className={statusBadge(r.status)}>{(r.status || "open").toUpperCase()}</span>
                  </div>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>{typeLabel(r.type)}</div>
                  {r.details && <div className="muted" style={{ marginTop: 6 }}>{r.details}</div>}
                  {r.response && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0EFEA" }}>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>Staff response</div>
                      <div className="muted" style={{ marginTop: 4 }}>{r.response}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {canHandle && (
            <div>
              <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, marginBottom: 10 }}>
                All student requests
              </div>
              {all.loading && <Loader label="Loading requests..." />}
              {all.error && <div className="error-text">{all.error}</div>}
              {!all.loading && !all.error && (!all.data || all.data.length === 0) && (
                <div className="muted">No student requests yet.</div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {all.data?.map((r) => (
                  <StaffRequestItem key={r._id} request={r} onUpdated={all.refetch} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
