import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      setDone(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: 360 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Register for UCL Campus</div>
        {error && <div className="error-text" style={{ marginBottom: 12 }}>{error}</div>}
        {done && <div className="muted" style={{ marginBottom: 12, color: "#0E8F5E" }}>Account created — redirecting to sign in...</div>}
        <div className="form-group">
          <label>Full name</label>
          <input className="input" value={form.name} onChange={update("name")} required />
        </div>
        <div className="form-group">
          <label>University email</label>
          <input className="input" type="email" value={form.email} onChange={update("email")} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="input" type="password" value={form.password} onChange={update("password")} required />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select className="input" value={form.role} onChange={update("role")}>
            <option value="student">Student</option>
            <option value="academic">Academic Staff</option>
            <option value="administrative">Administrative Staff</option>
            <option value="society">Society Representative</option>
            <option value="system-admin">System Administrator</option>
          </select>
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <div className="muted" style={{ textAlign: "center", marginTop: 14 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
