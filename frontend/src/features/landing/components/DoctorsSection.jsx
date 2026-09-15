import { Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const doctors = [
  {
    initials: "AH",
    name: "Dr. Ahmed Hassan",
    specialty: "Cardiologist",
    qualification: "MD, FACC",
    experience: "18 years",
    rating: 4.9,
    available: true,
    color: "bg-sky-100 text-sky-700",
  },
  {
    initials: "SM",
    name: "Dr. Sara Mahmoud",
    specialty: "Neurologist",
    qualification: "MD, PhD",
    experience: "14 years",
    rating: 4.8,
    available: true,
    color: "bg-violet-100 text-violet-700",
  },
  {
    initials: "KE",
    name: "Dr. Karim El-Sayed",
    specialty: "Orthopedic Surgeon",
    qualification: "MD, FRCS",
    experience: "20 years",
    rating: 4.9,
    available: false,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "NF",
    name: "Dr. Nour Farid",
    specialty: "Pediatrician",
    qualification: "MD, FAAP",
    experience: "12 years",
    rating: 4.7,
    available: true,
    color: "bg-amber-100 text-amber-700",
  },
]

export default function DoctorsSection() {
  return (
    <section id="doctors" className="landing-section bg-white px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-600">Our Team</p>
            <h2 className="font-heading mt-2 max-w-[14ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[2.8rem]">
              Meet Our Top Specialists
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-500">
            Board-certified consultants dedicated to providing the highest standard of patient care.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Card
              key={doctor.name}
              className="doctor-card rounded-[1.5rem] border-slate-200/80 bg-white py-6 shadow-[0_8px_30px_rgba(80,110,150,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(80,110,150,0.14)]"
            >
              <CardHeader className="px-6">
                <div className="flex items-start justify-between">
                  <span className={`flex size-14 items-center justify-center rounded-2xl text-lg font-semibold ${doctor.color}`}>
                    {doctor.initials}
                  </span>
                  <div className="flex items-center gap-1 text-[13px] font-medium text-amber-500">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    {doctor.rating}
                  </div>
                </div>
                <CardTitle className="mt-4 text-[15px] text-[#24345c]">{doctor.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-6">
                <p className="text-[13px] font-medium text-sky-600">{doctor.specialty}</p>
                <p className="text-[12px] text-slate-400">
                  {doctor.qualification} · {doctor.experience}
                </p>
                <Badge
                  variant="outline"
                  className={`gap-1.5 ${doctor.available ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500"}`}
                >
                  <span className={`size-1.5 rounded-full ${doctor.available ? "bg-emerald-400" : "bg-slate-300"}`} />
                  {doctor.available ? "Available Today" : "Fully Booked"}
                </Badge>
              </CardContent>
              <CardFooter className="border-0 bg-transparent px-6 pt-0">
                {doctor.available ? (
                  <Link
                    to="/login"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#1d2a4a] text-[13px] font-medium text-white transition hover:bg-[#162038]"
                  >
                    <Calendar className="size-3.5" />
                    Book Now
                  </Link>
                ) : (
                  <span className="inline-flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 text-[13px] font-medium text-slate-400">
                    <Calendar className="size-3.5" />
                    Join Waitlist
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
