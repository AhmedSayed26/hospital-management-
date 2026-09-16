import { motion } from "motion/react"
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  "Appointments & records in one place",
  "Built for doctors, nurses & admins",
]

const wardActivity = [34, 52, 44, 68, 58, 76, 62, 88]

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const createFloatVariants = (delay = 1.2) => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
})

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[940px] overflow-hidden pb-28 pt-28 sm:min-h-[1000px]">
      <img
        src="/landing/sky.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 h-[78%] w-full object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-300/40 via-sky-100/20 to-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-white/85 to-white" />

      <div className="pointer-events-none absolute top-[18%] -left-24 size-72 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-[12%] -right-16 size-64 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute top-[38%] left-1/2 size-56 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={itemVariants}
          className="text-[11px] font-semibold tracking-[0.22em] text-[#1d2a4a]/60 uppercase"
        >
          Hospital Management System
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-heading whitespace-nowrap mt-5 max-w-[15ch] text-[1.50rem] leading-[1.1] font-medium tracking-tight text-[#24345c] sm:text-[3.5rem] sm:leading-[1.08]"
        >
          Care that moves at the speed of life
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-[42ch] text-[16px] leading-[1.7] text-slate-500 sm:text-[17px]"
        >
          Run your hospital from one calm dashboard — schedule visits, share records, and keep every
          ward in sync without the noise.
        </motion.p>

        {/* <motion.ul
          variants={itemVariants}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2"
        >
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center justify-center gap-2 text-[13px] text-slate-500"
            >
              <Sparkles className="size-3 shrink-0 text-sky-500/80" />
              {item}
            </li>
          ))}
        </motion.ul> */}

      </motion.div>

      <motion.div
        className="relative z-10 mx-auto mt-8 flex h-[440px] max-w-5xl items-center justify-center px-4 sm:mt-1 sm:h-[500px]"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={itemVariants}
          className="pointer-events-none absolute inset-0 flex items-end justify-center"
        >
          <img
            src="/landing/hand.png"
            alt="A hand reaching toward the sky"
            className="hero-hand h-full w-auto max-w-[min(100%,580px)] !shadow-none object-contain object-bottom select-none"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute top-[50%] left-0 sm:top-[48%] sm:left-[6%]"
        >
          <motion.div variants={createFloatVariants(1.2)} animate="animate">
            <Card className="w-[196px] rounded-[1.65rem] border-white/90 bg-white/45 py-4 shadow-[0_20px_55px_rgba(90,130,180,0.18)] ring-0 backdrop-blur-2xl sm:w-[220px]">
              <CardContent className="px-4 sm:px-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-medium text-slate-600">Appointments Today</p>
                  <span className="flex size-7 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <CalendarCheck className="size-3.5" />
                  </span>
                </div>
                <p className="font-heading mt-4 text-[1.75rem] font-medium tracking-tight text-[#24345c]">
                  64
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <Clock className="size-3 text-emerald-500" />
                  12 walk-ins · avg wait 8 min
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute top-[18%] right-0 sm:top-[24%] sm:right-[6%]"
        >
          <motion.div variants={createFloatVariants(1.6)} animate="animate">
            <Card className="w-[210px] rounded-[1.65rem] border-white/90 bg-white/45 py-4 shadow-[0_20px_55px_rgba(90,130,180,0.18)] ring-0 backdrop-blur-2xl sm:w-[248px]">
              <CardContent className="px-4 sm:px-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-medium text-slate-600">Ward Activity</p>
                  <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Activity className="size-3.5" />
                  </span>
                </div>
                <div className="mt-5 flex h-20 items-end justify-between gap-1 px-0.5">
                  {wardActivity.map((height, index) => (
                    <motion.span
                      key={`${height}-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.85 + index * 0.05,
                        ease: "easeOut",
                      }}
                      className={`w-2.5 rounded-t-sm sm:w-3 ${
                        index >= wardActivity.length - 2
                          ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                          : "bg-slate-200/90"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Stethoscope className="size-3" />
                    18 teams on duty
                  </span>
                  <span className="font-medium text-emerald-600">Live</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-[12%] left-1/2 hidden -translate-x-1/2 sm:flex"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-4 py-2 text-[11px] font-medium text-slate-600 shadow-[0_8px_24px_rgba(90,130,180,0.1)] backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            HIPAA-ready · Encrypted end-to-end
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
