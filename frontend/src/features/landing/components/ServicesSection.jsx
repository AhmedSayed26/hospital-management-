import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  HeartPulse,
  ScanLine,
  Scissors,
  Siren,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    description: "Advanced heart diagnostics, angioplasty, and cardiac rehabilitation programs.",
    badge: "24/7 Unit",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Stroke care, epilepsy management, and neuro-imaging with expert consultants.",
    badge: "Specialist",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Child wellness, vaccinations, neonatal ICU, and family-centered pediatric care.",
    badge: "Family Care",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Joint replacement, sports injuries, spine surgery, and physical therapy.",
    badge: "Surgery",
  },
  {
    icon: Scissors,
    title: "General Surgery",
    description: "Minimally invasive procedures, laparoscopic surgery, and post-op recovery.",
    badge: "Advanced",
  },
  {
    icon: Siren,
    title: "Emergency Care",
    description: "Level-1 trauma center with rapid triage, ambulance dispatch, and critical care.",
    badge: "Always Open",
  },
  {
    icon: ScanLine,
    title: "Radiology",
    description: "MRI, CT scan, ultrasound, and digital X-ray with same-day reporting.",
    badge: "Digital",
  },
  {
    icon: Activity,
    title: "Internal Medicine",
    description: "Chronic disease management, preventive screenings, and inpatient care.",
    badge: "Primary",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="landing-section bg-gradient-to-b from-white to-sky-50/40 px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-600">Our Specialties</p>
            <h2 className="font-heading mt-2 max-w-[16ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[2.8rem]">
              Comprehensive Medical Services
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-500">
              From routine checkups to complex surgeries — our departments are equipped with modern technology and experienced specialists.
            </p>
          </div>
          <figure className="shrink-0 lg:max-w-[420px]">
            <img
              src="/landing/services-banner.png"
              alt="Modern hospital medical departments and specialized care units"
              className="h-48 w-full rounded-[1.75rem] object-cover shadow-[0_18px_40px_rgba(80,110,150,0.14)] sm:h-56"
            />
          </figure>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="service-card group rounded-[1.5rem] border-slate-200/80 bg-white py-6 shadow-[0_8px_30px_rgba(80,110,150,0.08)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_16px_40px_rgba(80,110,150,0.14)]"
            >
              <CardHeader className="px-6">
                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-[#1d2a4a] transition group-hover:bg-[#1d2a4a] group-hover:text-white">
                    <service.icon className="size-5" />
                  </span>
                  <Badge variant="secondary" className="bg-sky-50 text-sky-700">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="mt-5 text-[16px] text-[#24345c]">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <p className="text-[13px] leading-relaxed text-slate-500">{service.description}</p>
              </CardContent>
              <CardFooter className="border-0 bg-transparent px-6 pt-0">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1d2a4a] transition hover:gap-2.5"
                >
                  Book Appointment
                  <ArrowRight className="size-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
