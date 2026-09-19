import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import uclLogo from "../assets/ucl-logo.png";

function EyeIcon({ off }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {off ? (
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.6 18.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          background: "linear-gradient(135deg, #C81F1A 0%, #9B1C16 22%, #771917 45%, #521615 68%, #1D1312 100%)",
          color: "#F5F1EF",
          padding: 52,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img src={uclLogo} alt="UCL logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>UCL Campus</div>
        </div>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2 }}>
            One place for everything happening at UCL.
          </div>
          <div className="muted" style={{ color: "#F1DEDC", marginTop: 14 }}>
            Announcements, events, societies, lost &amp; found and room booking — all in one hub.
          </div>
        </div>
        <div className="muted" style={{ color: "#E8CFCC" }}>DevDash '26 &middot; Universal College Lanka</div>
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
            <div style={{ position: "relative" }}>
              <input
                className="input"
                style={{ paddingRight: 42 }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 4,
                  display: "flex",
                  cursor: "pointer",
                  color: "var(--muted)",
                }}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in to UCL Campus"}
          </button>
          <div className="muted" style={{ textAlign: "center", marginTop: 14 }}>
            Forgot password? Contact your administrator.
          </div>
        </form>
      </div>
    </div>
  );
}