import { useState, useRef } from "react";

const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/svg+xml"];

export default function ReportItemForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const resetPhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      resetPhoto();
      setPhotoError("");
      return;
    }
    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      resetPhoto();
      setPhotoError("Unsupported file type. Please upload a JPEG, PNG or other image file.");
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      resetPhoto();
      setPhotoError("Photo must be 10MB or smaller.");
      return;
    }
    setPhotoError("");
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || photoError) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      formData.append("location", location);
      formData.append("description", description);
      if (photo) formData.append("photo", photo);
      await onSubmit(formData);
      setName(""); setStatus("lost"); setLocation(""); setDescription("");
      resetPhoto();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 700, marginBottom: 14 }}>Report an item</div>
      <div className="form-group">
        <label>Item name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Black backpack" />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Near Library" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="input" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Any identifying details" />
      </div>
      <div className="form-group">
        <label>Photo (optional, max 10MB)</label>
        <input
          ref={fileInputRef}
          className="input"
          style={{ paddingTop: 8 }}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {photoError && <div className="error-text">{photoError}</div>}
        {photoPreview && (
          <img
            src={photoPreview}
            alt="Photo preview"
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid var(--card-border)" }}
          />
        )}
      </div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit report"}
      </button>
    </form>
  );
}
