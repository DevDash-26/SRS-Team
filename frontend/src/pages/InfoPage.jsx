import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import InfoCard from "../components/infoPages/InfoCard";
import CalendarEntryForm from "../components/infoPages/CalendarEntryForm";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";
import { getInfoByCategory, createInfoContent, deleteInfoContent } from "../services/infoContentService";

const TITLES = {
  faq: "FAQ",
  calendar: "Academic Calendar",
  onboarding: "Student Onboarding",
  volunteering: "Volunteering Opportunities",
  alumni: "Alumni Engagement",
  jobs: "Jobs & Internships",
  "staff-directory": "Staff Directory",
  "financial-support": "Financial Support",
  sports: "Sports & Recreation",
  dining: "Dining Information",
  printing: "Printing Services",
  wellbeing: "Wellbeing Support",
  "it-support": "IT Support",
  library: "Library Resources",
  "student-life": "Student Life Highlights",
};

export default function InfoPage() {
  const { category } = useParams();
  const { user } = useAuth();
  const { data, loading, error, refetch } = useFetch(() => getInfoByCategory(category), [category]);
  const title = TITLES[category] || category;
  const canManage = category === "calendar" && user?.role && user.role !== "student";

  const handleCreate = async (payload) => {
    await createInfoContent(category, payload);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteInfoContent(id);
    refetch();
  };

  return (
    <Layout title={title}>
      {canManage && (
        <div style={{ marginBottom: 20, maxWidth: 420 }}>
          <CalendarEntryForm onSubmit={handleCreate} />
        </div>
      )}
      {loading && <Loader label={`Loading ${title}...`} />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">Nothing published here yet.</div>}
      <div className="grid grid-2">
        {data?.map((item) => (
          <InfoCard key={item._id} item={item} onDelete={canManage ? handleDelete : undefined} />
        ))}
      </div>
    </Layout>
  );
}
