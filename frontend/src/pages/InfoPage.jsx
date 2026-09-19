import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import Loader from "../components/common/Loader";
import InfoCard from "../components/infoPages/InfoCard";
import { useFetch } from "../hooks/useFetch";
import { getInfoByCategory } from "../services/infoContentService";

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
  const { data, loading, error } = useFetch(() => getInfoByCategory(category), [category]);
  const title = TITLES[category] || category;

  return (
    <Layout title={title}>
      {loading && <Loader label={`Loading ${title}...`} />}
      {error && <div className="error-text">{error}</div>}
      {!loading && !error && (!data || data.length === 0) && <div className="muted">Nothing published here yet.</div>}
      <div className="grid grid-2">
        {data?.map((item) => <InfoCard key={item._id} item={item} />)}
      </div>
    </Layout>
  );
}
