import { useState } from "react";
import Layout from "../components/common/Layout";
import { submitFeedback } from "../services/feedbackService";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    setSubmitting(true);
    try {
      await submitFeedback({ message });
      setMessage("");
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Feedback">
      <form className="card" style={{ maxWidth: 480 }} onSubmit={handleSubmit}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Send feedback or ask a question</div>
        {sent && <div className="muted" style={{ color: "#0E8F5E", marginBottom: 12 }}>Thanks — your feedback was sent.</div>}
        <div className="form-group">
          <textarea className="input" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's on your mind?" />
        </div>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send feedback"}
        </button>
      </form>
    </Layout>
  );
}
