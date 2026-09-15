import { Hospital, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = [
  { to: "/#about", label: "About" },
  { to: "/#services", label: "Services" },
  { to: "/#doctors", label: "Doctors" },
  { to: "/#faq", label: "FAQ" },
  { to: "/login", label: "Login" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-b from-white to-sky-50/70 px-4 pb-8 pt-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.7fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-[#1d2a4a] text-white">
              <Hospital className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-[#24345c]">Hospital Management</p>
              <p className="text-xs text-slate-400">Care, organized with empathy</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-slate-500">
            A hospital platform for patients, doctors, and staff — appointments, records, and daily care in one place.
          </p>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-[#24345c]">Hospital</p>
          <nav className="mt-4 flex flex-col items-start gap-2.5">
            {footerLinks.map((link) =>
              link.to.includes("#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-[13px] text-slate-500 transition hover:text-[#24345c]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[13px] text-slate-500 transition hover:text-[#24345c]"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-[#24345c]">Contact</p>
          <ul className="mt-4 space-y-3 text-[13px] text-slate-500">
            <li className="flex items-center gap-2.5">
              <Phone className="size-3.5 text-slate-400" />
              +20 100 000 0000
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-3.5 text-slate-400" />
              contact@hospital.com
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-slate-400" />
              Cairo, Egypt
            </li>
          </ul>
          <Link
            to="/login"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-[#1d2a4a] px-5 text-[13px] font-medium text-white transition hover:bg-[#162038]"
          >
            Staff Login
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-slate-200/80 pt-5 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Hospital Management. All rights reserved.</p>
        <p>Built for patients, doctors, and hospital teams.</p>
      </div>
    </footer>
  )
}
