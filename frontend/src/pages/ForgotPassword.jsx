import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uclLogo from "../assets/ucl-logo.png";
import { isValidEmail } from "../utils/validators";
import { forgotPassword, resetPassword } from "../services/authService";

export default function ForgotPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const data = await forgotPassword(email);
      setInfo(data.message || "If that email is registered, a reset code has been sent.");
      setStep("reset");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not send the reset code. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (!code.trim()) {
      setError("Enter the code sent to your email.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await resetPassword({ email, code: code.trim(), newPassword });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not reset your password. Check the code and try again.");
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
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>UCL Campus</div>
            <div style={{ fontSize: 10.5, color: "#D9B8B5" }}>Universal College Lanka</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2 }}>
            Let's get you back into your account.
          </div>
          <div className="muted" style={{ color: "#F1DEDC", marginTop: 14 }}>
            We'll email you a code to confirm it's really you before you set a new password.
          </div>
        </div>
        <div className="muted" style={{ color: "#E8CFCC" }}>DevDash '26 &middot; Universal College Lanka</div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step === "email" ? (
          <form onSubmit={handleRequestCode} style={{ width: 360 }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Reset your password</div>
            <div className="muted" style={{ marginBottom: 20 }}>Enter your UCL email and we'll send you a reset code.</div>
            {error && <div className="error-text" style={{ marginBottom: 12 }}>{error}</div>}
            <div className="form-group">
              <label>University email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@ucl.lk" required />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={submitting}>
              {submitting ? "Sending code..." : "Send reset code"}
            </button>
            <div className="muted" style={{ textAlign: "center", marginTop: 14 }}>
              <Link to="/login">Back to sign in</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} style={{ width: 360 }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Enter your code</div>
            <div className="muted" style={{ marginBottom: 20 }}>{info || `We sent a 6-digit code to ${email}.`}</div>
            {error && <div className="error-text" style={{ marginBottom: 12 }}>{error}</div>}
            <div className="form-group">
              <label>Reset code</label>
              <input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input className="input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input className="input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} type="submit" disabled={submitting}>
              {submitting ? "Resetting..." : "Reset password"}
            </button>
            <div className="muted" style={{ textAlign: "center", marginTop: 14 }}>
              Didn't get a code?{" "}
              <button
                type="button"
                onClick={() => { setStep("email"); setError(""); setCode(""); }}
                style={{ background: "none", border: "none", padding: 0, color: "var(--red)", cursor: "pointer", font: "inherit", fontWeight: 700 }}
              >
                Try again
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
