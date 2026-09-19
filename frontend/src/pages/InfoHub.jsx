import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import { INFO_CATEGORIES } from "../utils/infoCategories";

export default function InfoHub() {
  return (
    <Layout title="Info & Resources">
      <div className="muted" style={{ marginBottom: 18 }}>
        Everything the university publishes for students, in one place.
      </div>
      <div className="grid grid-3">
        {INFO_CATEGORIES.map((c) => (
          <Link key={c.slug} to={`/info/${c.slug}`} className="card" style={{ display: "block", color: "inherit" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
            <div className="muted" style={{ fontSize: 12.5 }}>{c.description}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
