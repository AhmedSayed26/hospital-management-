import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import ApplicationLayout from "./layouts/ApplicationLayout";
import RequireRole from "./components/app/RequireRole";
import LandingPage from "./features/landing/LandingPage";
import Login from "./pages/auth/Login";
import PatientsRegister from "./pages/auth/PatientsRegister";
import DoctorsRegister from "./pages/auth/DoctorsRegister";
import DashboardPage from "./pages/app/DashboardPage";
import AppointmentsPage from "./pages/app/AppointmentsPage";
import RecordsPage from "./pages/app/RecordsPage";
import PrescriptionsPage from "./pages/app/PrescriptionsPage";
import PatientsPage from "./pages/app/PatientsPage";
import RoomsPage from "./pages/app/RoomsPage";
import ReportsPage from "./pages/app/ReportsPage";
import ProfilePage from "./pages/app/ProfilePage";
import PatiendDetails from "./features/App/patients/[patientId]/PatiendDetails";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="patients" element={<PatientsRegister />} />
        <Route path="doctors" element={<DoctorsRegister />} />
      </Route>

      <Route path="/app" element={<ApplicationLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="records" element={<RecordsPage />} />
        <Route path="prescriptions" element={<PrescriptionsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route
          path="patients"
          element={
            <RequireRole roles={["ADMIN"]}>
              <PatientsPage />
            </RequireRole>
          }
        />
        <Route
          path="patients/:patientId"
          element={
            <RequireRole roles={["ADMIN"]}>
              <PatiendDetails />
            </RequireRole>
          }
        />
        <Route
          path="rooms"
          element={
            <RequireRole roles={["ADMIN"]}>
              <RoomsPage />
            </RequireRole>
          }
        />
        <Route
          path="reports"
          element={
            <RequireRole roles={["ADMIN"]}>
              <ReportsPage />
            </RequireRole>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
