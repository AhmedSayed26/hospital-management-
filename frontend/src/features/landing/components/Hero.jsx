import { ArrowRight, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

const sleepBars = [38, 48, 58, 42, 64, 52, 86]

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[920px] overflow-hidden pb-24 pt-28 sm:min-h-[980px]">
      <img
        src="/landing/sky.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 h-[78%] w-full object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-300/35 via-sky-100/25 to-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-white/80 to-white" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h1 className="hero-title font-heading max-w-[16ch] text-[2.65rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-6xl">
          Human-Centered Hospital Care Powered Smartly
        </h1>
        <p className="hero-copy mt-5 max-w-[28ch] text-[15px] leading-relaxed whitespace-nowrap text-slate-500">
          A hospital management system designed with empathy
        </p>
        <Link
          to="/login"
          className="hero-cta mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#1d2a4a] px-6 text-[13px] font-medium text-white shadow-[0_10px_24px_rgba(29,42,74,0.28)] transition hover:bg-[#162038]"
        >
          Get Started Today
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex h-[430px] max-w-4xl items-center justify-center px-4 sm:h-[480px]">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
          <img
            src="/landing/hand.png"
            alt="A hand reaching toward the sky"
            className="hero-hand h-full w-auto max-w-[min(100%,560px)] !shadow-none object-contain object-bottom select-none"
          />
        </div>

        <Card className="float-card absolute top-[48%] left-2 w-[200px] rounded-[1.6rem] border-white/80 bg-white/35 py-5 shadow-[0_18px_50px_rgba(90,130,180,0.14)] ring-0 backdrop-blur-2xl sm:top-[46%] sm:left-[8%] sm:w-[230px]">
          <CardContent className="px-5">
            <p className="text-[13px] font-medium text-slate-600">Today&apos;s Patients</p>
            <div className="mt-6 flex items-center gap-2.5 text-[13px] text-slate-500">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#1d2a4a] text-white">
                <Users className="size-3" />
              </span>
              128 / 150 Beds
            </div>
            <p className="mt-10 text-[11px] text-slate-400">12% this Month</p>
          </CardContent>
        </Card>

        <Card className="float-card absolute top-[22%] right-2 w-[210px] rounded-[1.6rem] border-white/80 bg-white/35 py-5 shadow-[0_18px_50px_rgba(90,130,180,0.14)] ring-0 backdrop-blur-2xl sm:top-[28%] sm:right-[8%] sm:w-[270px]">
          <CardContent className="px-5">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-slate-600">Bed Occupancy</p>
              <span className="size-2 rounded-full bg-slate-300" />
            </div>
            <div className="mt-8 flex h-24 items-end justify-between gap-2 px-1">
              {sleepBars.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className={`w-4 rounded-t-md sm:w-5 ${
                    index === sleepBars.length - 1 ? "bg-emerald-400" : "bg-slate-200/90"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
