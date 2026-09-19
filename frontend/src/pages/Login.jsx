import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not sign in. Check your email and password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: 460,
          flexShrink: 0,
          background: "#181212",
          color: "#F5F1EF",
          padding: 52,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18 }}>UCL Campus</div>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2 }}>
            One place for everything happening at UCL.
          </div>
          <div className="muted" style={{ color: "#D9CFCD", marginTop: 14 }}>
            Announcements, events, societies, lost &amp; found and room booking — all in one hub.
          </div>
        </div>
        <div className="muted" style={{ color: "#A99B98" }}>DevDash '26 &middot; Universal College Lanka</div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit} style={{ width: 360 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Sign in to UCL Campus</div>
          <div className="muted" style={{ marginBottom: 20 }}>We'll take you straight to your dashboard.</div>
          {error && <div className="error-text" style={{ marginBottom: 12 }}>{error}</div>}
          <div className="form-group">
            <label>University email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@ucl.lk" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in to UCL Campus"}
          </button>
          <div className="muted" style={{ textAlign: "center", marginTop: 14 }}>
            New here? <Link to="/register">Register with your UCL email</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
