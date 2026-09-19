import { useState } from "react";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { submitFeedback, getFeedback, respondToFeedback } from "../services/feedbackService";

function FeedbackItem({ item, canRespond, onResponded }) {
  const [reply, setReply] = useState("");
  const [saving, setSaving] = useState(false);

  const handleRespond = async () => {
    if (!reply.trim()) return;
    setSaving(true);
    try {
      await respondToFeedback(item._id, { response: reply.trim(), status: "reviewed" });
      setReply("");
      onResponded();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
        <div style={{ fontSize: 13.5 }}>{item.message}</div>
        <span className={item.status === "reviewed" ? "badge badge-green" : "badge badge-amber"}>
          {(item.status || "new").toUpperCase()}
        </span>
      </div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 6 }}>
        {item.user?.name || "Student"}
        {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString()}` : ""}
      </div>
      {item.response && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0EFEA" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Reply from staff</div>
          <div className="muted" style={{ marginTop: 4 }}>{item.response}</div>
        </div>
      )}
      {canRespond && !item.response && (
        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <input
            className="input"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
          />
          <button className="btn btn-primary" style={{ flexShrink: 0 }} onClick={handleRespond} disabled={saving}>
            {saving ? "Sending..." : "Reply"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Feedback() {
  const { user } = useAuth();
  const canRespond = Boolean(user?.role) && user.role !== "student";
  const { data, loading, error, refetch } = useFetch(getFeedback, []);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await submitFeedback({ message: message.trim() });
      setMessage("");
      setSent(true);
      refetch();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Feedback">
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <form className="card" style={{ width: 380, flexShrink: 0 }} onSubmit={handleSubmit}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Send feedback or ask a question</div>
          {sent && <div className="muted" style={{ color: "#0E8F5E", marginBottom: 12 }}>Thanks — your feedback was sent.</div>}
          <div className="form-group">
            <textarea className="input" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind?" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send feedback"}
          </button>
        </form>

        <div style={{ flex: 1 }}>
          <div className="muted" style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, marginBottom: 10 }}>
            {canRespond ? "All feedback" : "Your feedback & replies"}
          </div>
          {loading && <Loader label="Loading feedback..." />}
          {error && <div className="error-text">{error}</div>}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="muted">{canRespond ? "No feedback submitted yet." : "You haven't sent any feedback yet."}</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data?.map((item) => (
              <FeedbackItem key={item._id} item={item} canRespond={canRespond} onResponded={refetch} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
