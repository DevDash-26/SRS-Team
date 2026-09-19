import { useState } from "react";
import { isValidEmail } from "../../utils/validators";
import { FACULTIES, YEAR_GROUPS, PROGRAMMES } from "../../utils/constants";

const ROLES = ["student", "academic", "administrative", "society", "system-admin"];

export default function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [faculty, setFaculty] = useState(FACULTIES[0]);
  const [programme, setProgramme] = useState(PROGRAMMES[0]);
  const [yearGroup, setYearGroup] = useState(YEAR_GROUPS[0]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const needsFaculty = role === "student" || role === "academic";
  const needsStudentFields = role === "student";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) return;
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        name,
        email,
        password,
        role,
        faculty: needsFaculty ? faculty : undefined,
        programme: needsStudentFields ? programme : undefined,
        yearGroup: needsStudentFields ? yearGroup : undefined,
      });
      setName(""); setEmail(""); setPassword(""); setRole(ROLES[0]);
      setFaculty(FACULTIES[0]); setProgramme(PROGRAMMES[0]); setYearGroup(YEAR_GROUPS[0]);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not create user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>New user</div>
      {error && <div className="error-text" style={{ marginBottom: 10 }}>{error}</div>}
      <div className="form-group">
        <label>Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@ucl.lk" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      {needsFaculty && (
        <div className="form-group">
          <label>Faculty</label>
          <select className="input" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            {FACULTIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      )}
      {needsStudentFields && (
        <>
          <div className="form-group">
            <label>Programme</label>
            <select className="input" value={programme} onChange={(e) => setProgramme(e.target.value)}>
              {PROGRAMMES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Year group</label>
            <select className="input" value={yearGroup} onChange={(e) => setYearGroup(e.target.value)}>
              {YEAR_GROUPS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </>
      )}
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create user"}
      </button>
    </form>
  );
}
