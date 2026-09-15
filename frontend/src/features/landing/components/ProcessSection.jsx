import { CalendarCheck, ClipboardList, FileText, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find a Doctor",
    description: "Browse specialties, read profiles, and choose the right consultant for your needs.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Appointment",
    description: "Select a convenient date and time online — no phone calls or long waiting lines.",
  },
  {
    icon: ClipboardList,
    step: "03",
    title: "Visit or Consult",
    description: "Attend in-person at the hospital or connect via telehealth for follow-up visits.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Access Records",
    description: "View prescriptions, lab results, and medical history securely in your patient portal.",
  },
]

export default function ProcessSection() {
  return (
    <section className="landing-section bg-gradient-to-b from-sky-50/40 to-white px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-600">How It Works</p>
          <h2 className="font-heading mx-auto mt-2 max-w-[16ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[2.8rem]">
            Your Care Journey in 4 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-500">
            From finding the right doctor to accessing your records — we make every step seamless.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-12 hidden h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

          {steps.map((item) => (
            <Card
              key={item.step}
              className="process-step relative border-slate-200/80 bg-white py-6 text-center shadow-[0_8px_24px_rgba(80,110,150,0.08)]"
            >
              <CardContent className="px-6">
                <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <item.icon className="size-6 text-[#1d2a4a]" />
                  <Badge className="absolute -right-2 -top-2 size-6 justify-center rounded-full bg-[#1d2a4a] p-0 text-[10px] font-bold text-white">
                    {item.step}
                  </Badge>
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-[#24345c]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
