import { Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import AuthLayout from "./layouts/AuthLayout"
import LandingPage from "./features/landing/LandingPage"
import Login from "./pages/auth/Login"
import PatientsRegister from "./pages/auth/PatientsRegister"
import DoctorsRegister from "./pages/auth/DoctorsRegister"

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
    </Routes>
  )
}
export default App
