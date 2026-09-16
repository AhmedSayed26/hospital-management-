import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { HeartPulse, Hospital, Menu, X } from "lucide-react"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#services", label: "Services" },
  { to: "/#doctors", label: "Doctors" },
  { to: "/#faq", label: "FAQ" },
  { to: "/login", label: "Login" },
]

export default function NavBar() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (to) => {
    if (to.includes("#")) return pathname + hash === to
    return pathname === to && !hash
  }

  return (
    <header className="landing-nav pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-10">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1d2a4a] text-white shadow-[0_8px_24px_rgba(29,42,74,0.25)]">
            <Link 
            to="/"
            onClick={() => setOpen(false)}
            >
            <HeartPulse className="size-5" strokeWidth={1.75} />
            </Link>
          </span>
        </div>

        <nav className="hidden items-center rounded-full border border-white/70 bg-white/55 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(80,120,170,0.12)] backdrop-blur-xl md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.to)
            const className = `rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-[#1d2a4a] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`

            return link.to.includes("#") ? (
              <a key={link.to} href={link.to} className={className}>
                {link.label}
              </a>
            ) : (
              <Link key={link.to} to={link.to} className={className}>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/55 text-slate-700 shadow-[0_8px_32px_rgba(80,120,170,0.12)] backdrop-blur-xl md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="pointer-events-auto mx-auto mt-3 max-w-6xl rounded-3xl border border-white/70 bg-white/80 p-3 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              const className = `flex w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                active ? "bg-[#1d2a4a] text-white" : "text-slate-600 hover:bg-slate-100/70"
              }`

              return link.to.includes("#") ? (
                <a key={link.to} href={link.to} onClick={() => setOpen(false)} className={className}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={className}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
