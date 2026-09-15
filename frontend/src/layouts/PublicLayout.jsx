import { Outlet } from "react-router-dom"
import Footer from "@/features/landing/components/Footer"
import NavBar from "@/features/landing/components/NavBar"

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
