import { Award, BedDouble, Clock, FlaskConical, MonitorSmartphone, ShieldCheck, Users, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { icon: Users, value: "50+", label: "Senior Specialists" },
  { icon: BedDouble, value: "150+", label: "Hospital Beds" },
  { icon: Clock, value: "24/7", label: "Emergency Care" },
  { icon: Award, value: "99%", label: "Satisfaction Rate" },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: "Modern ICU Facilities",
    description: "Fully equipped intensive care units with continuous monitoring and dedicated nursing staff.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Health Records",
    description: "Secure electronic medical records accessible to patients and doctors anytime, anywhere.",
  },
  {
    icon: Video,
    title: "Telehealth Support",
    description: "Virtual consultations for follow-ups, prescriptions, and remote patient monitoring.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Diagnostic Lab",
    description: "On-site laboratory with rapid turnaround for blood work, pathology, and imaging results.",
  },
]

export default function DepartmentsSection() {
  return (
    <section className="landing-section bg-[#1d2a4a] px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-300">Why Choose Us</p>
            <h2 className="font-heading mt-2 max-w-[18ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-white sm:text-[2.8rem]">
              Trusted Healthcare Excellence
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
              State-of-the-art facilities, round-the-clock emergency care, and a team committed to your wellbeing.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <img
              src="/landing/departments-icu.png"
              alt="Modern hospital ICU with advanced monitoring equipment"
              className="h-56 w-full object-cover sm:h-64"
            />
          </figure>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="stat-card rounded-[1.5rem] border-white/10 bg-white/5 py-6 text-center ring-white/10 backdrop-blur-sm"
            >
              <CardContent className="px-6">
                <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
                  <stat.icon className="size-5" />
                </span>
                <p className="stat-value mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-[13px] text-slate-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="pillar-card rounded-[1.5rem] border-white/10 bg-white/5 py-6 ring-white/10 backdrop-blur-sm"
            >
              <CardContent className="flex gap-4 px-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
                  <pillar.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{pillar.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
