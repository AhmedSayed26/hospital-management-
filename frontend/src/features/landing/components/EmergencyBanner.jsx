import { MapPin, Phone, Siren } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function EmergencyBanner() {
  return (
    <section className="landing-section px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Card className="relative overflow-hidden rounded-[1.75rem] border-0 bg-gradient-to-r from-red-600 to-red-700 py-0 shadow-[0_16px_40px_rgba(220,38,38,0.25)] ring-0">
          <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-12 -left-6 size-48 rounded-full bg-white/5" />

          <CardContent className="relative px-6 py-6 sm:px-10 sm:py-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                  <Siren className="size-6 animate-pulse" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">24/7 Emergency & Trauma Center</h2>
                    <Badge className="gap-1.5 bg-white/20 text-white hover:bg-white/20">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
                      Dispatch Active
                    </Badge>
                  </div>
                  <p className="mt-1 max-w-md text-[13px] leading-relaxed text-red-100">
                    Our emergency team is ready around the clock. Ambulance dispatch, trauma care, and critical ICU support available immediately.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <a
                  href="tel:+201000000000"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-red-700 transition hover:bg-red-50"
                >
                  <Phone className="size-4" />
                  +20 100 000 0000
                </a>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-red-100">
                  <MapPin className="size-3.5" />
                  ER Entrance — Ground Floor, Gate 3
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
