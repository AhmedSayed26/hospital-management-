import { BadgeCheck, Quote, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const testimonials = [
  {
    name: "Mona Ibrahim",
    role: "Patient — Cardiology",
    rating: 5,
    text: "The cardiology team was incredibly thorough. From diagnosis to recovery, I felt supported every step of the way. The online portal made follow-ups so easy.",
  },
  {
    name: "Omar Khalil",
    role: "Patient — Orthopedics",
    rating: 5,
    text: "After my knee surgery, the rehabilitation program was outstanding. Dr. Karim and his team explained everything clearly and my recovery was faster than expected.",
  },
  {
    name: "Layla Mostafa",
    role: "Parent — Pediatrics",
    rating: 5,
    text: "Dr. Nour was wonderful with my daughter. The pediatric ward is clean, friendly, and the staff made us feel at home during a stressful time.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="landing-section bg-white px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="text-center lg:text-left">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-600">Patient Stories</p>
            <h2 className="font-heading mt-2 max-w-[14ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[2.8rem]">
              What Our Patients Say
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 lg:mx-0">
              Real experiences from patients who trusted us with their care and recovery.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_rgba(80,110,150,0.14)]">
            <img
              src="/landing/testimonials-hero.png"
              alt="Happy patient leaving the hospital with family after recovery"
              className="h-52 w-full object-cover sm:h-60"
            />
          </figure>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.name}
              className="testimonial-card rounded-[1.5rem] border-slate-200/80 bg-gradient-to-b from-white to-sky-50/30 py-6 shadow-[0_8px_30px_rgba(80,110,150,0.08)]"
            >
              <CardContent className="px-6">
                <Quote className="size-8 text-sky-200" />
                <p className="mt-4 text-[14px] leading-relaxed text-slate-600">&ldquo;{item.text}&rdquo;</p>

                <div className="mt-5 flex items-center gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center gap-3 border-slate-100 bg-transparent px-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#1d2a4a] text-[13px] font-semibold text-white">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[14px] font-semibold text-[#24345c]">{item.name}</p>
                    <Badge variant="secondary" className="h-5 gap-1 bg-sky-50 px-1.5 text-sky-600">
                      <BadgeCheck className="size-3" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-[12px] text-slate-400">{item.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
