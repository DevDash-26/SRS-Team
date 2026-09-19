import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Announcements from "../pages/Announcements";
import Events from "../pages/Events";
import Societies from "../pages/Societies";
import LostFound from "../pages/LostFound";
import RoomBooking from "../pages/RoomBooking";
import AcademicSupport from "../pages/AcademicSupport";
import Assistant from "../pages/Assistant";
import AdminPanel from "../pages/AdminPanel";
import FacilityIssues from "../pages/FacilityIssues";
import TextbookExchange from "../pages/TextbookExchange";
import Feedback from "../pages/Feedback";
import InfoHub from "../pages/InfoHub";
import InfoPage from "../pages/InfoPage";
import ProtectedRoute from "../components/common/ProtectedRoute";

const STAFF_ROLES = ["academic", "administrative", "society", "system-admin"];
const ROOM_BOOKING_ROLES = ["student", "academic", "administrative", "system-admin"];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path="/societies" element={<ProtectedRoute><Societies /></ProtectedRoute>} />
      <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
      <Route
        path="/room-booking"
        element={
          <ProtectedRoute roles={ROOM_BOOKING_ROLES}>
            <RoomBooking />
          </ProtectedRoute>
        }
      />
      <Route path="/academic-support" element={<ProtectedRoute><AcademicSupport /></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
      <Route path="/facility-issues" element={<ProtectedRoute><FacilityIssues /></ProtectedRoute>} />
      <Route path="/textbook-exchange" element={<ProtectedRoute><TextbookExchange /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
      <Route path="/info" element={<ProtectedRoute><InfoHub /></ProtectedRoute>} />
      <Route path="/info/:category" element={<ProtectedRoute><InfoPage /></ProtectedRoute>} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={STAFF_ROLES}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
