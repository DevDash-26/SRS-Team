import { useState } from "react";
import { FACULTIES, YEAR_GROUPS, PROGRAMMES } from "../../utils/constants";

const AUDIENCE_OPTIONS = {
  "university-wide": null,
  faculty: FACULTIES,
  "year-group": YEAR_GROUPS,
  programme: PROGRAMMES,
};

export default function AnnouncementForm({ onSubmit, initialValues, onCancel }) {
  const isEdit = Boolean(initialValues);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [message, setMessage] = useState(initialValues?.message || "");
  const [audienceType, setAudienceType] = useState(initialValues?.audienceType || "university-wide");
  const [audienceValue, setAudienceValue] = useState(initialValues?.audienceValue || "");
  const [type, setType] = useState(initialValues?.type || "general");
  const [submitting, setSubmitting] = useState(false);

  const handleAudienceTypeChange = (e) => {
    const value = e.target.value;
    setAudienceType(value);
    setAudienceValue(AUDIENCE_OPTIONS[value] ? AUDIENCE_OPTIONS[value][0] : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    if (audienceType !== "university-wide" && !audienceValue) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        message,
        audienceType,
        audienceValue: audienceType === "university-wide" ? undefined : audienceValue,
        type,
      });
      if (!isEdit) {
        setTitle("");
        setMessage("");
        setAudienceType("university-wide");
        setAudienceValue("");
        setType("general");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>{isEdit ? "Edit announcement" : "New announcement"}</div>
      <div className="form-group">
        <label>Title</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Guest lecture rescheduled" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea className="input" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write the announcement details..." />
      </div>
      <div className="form-group">
        <label>Audience</label>
        <select className="input" value={audienceType} onChange={handleAudienceTypeChange}>
          <option value="university-wide">University-wide</option>
          <option value="faculty">Specific faculty</option>
          <option value="year-group">Specific year group</option>
          <option value="programme">Specific programme</option>
        </select>
      </div>
      {AUDIENCE_OPTIONS[audienceType] && (
        <div className="form-group">
          <label>
            {audienceType === "faculty" ? "Faculty" : audienceType === "year-group" ? "Year group" : "Programme"}
          </label>
          <select className="input" value={audienceValue} onChange={(e) => setAudienceValue(e.target.value)}>
            {AUDIENCE_OPTIONS[audienceType].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      )}
      <div className="form-group">
        <label>Type</label>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="general">General</option>
          <option value="emergency">Urgent / Emergency</option>
          <option value="schedule-change">Schedule Change</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Publish announcement"}
        </button>
        {onCancel && (
          <button className="btn btn-outline" style={{ flex: 1 }} type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
