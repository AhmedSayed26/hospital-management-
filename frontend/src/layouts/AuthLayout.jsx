import { Outlet } from "react-router-dom"
import LeftSection from "@/features/Auth/components/LeftSection"

export default function AuthLayout() {

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="grid flex-1 lg:grid-cols-2">
        <LeftSection />
        <div className="flex items-center justify-center px-4 py-16 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl overflow-hidden">
              <Outlet />
          </div>
        </div>
      </section>
    </div>
  )
}
