import { motion } from "motion/react"
import { ArrowUpRight, Calendar, FileText, HeartPulse, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  { icon: Calendar, label: "Smart scheduling" },
  { icon: FileText, label: "Unified records" },
  { icon: HeartPulse, label: "Patient-first care" },
]

const occupancyBars = [42, 58, 48, 72, 54, 68, 88]

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

export default function LeftSection() {
  return (
    <aside className="relative hidden min-h-full overflow-hidden bg-[#eef4fb] lg:block">
      <img
        src="/landing/sky.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 h-[72%] w-full object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-200/40 via-[#eef4fb]/60 to-[#eef4fb]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#eef4fb] via-[#eef4fb]/90 to-transparent" />

      <motion.div
        className="relative z-10 flex h-full min-h-full flex-col px-10 py-12 xl:px-14"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1d2a4a] text-white shadow-[0_8px_24px_rgba(29,42,74,0.25)]">
            <HeartPulse className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#1d2a4a]/70 uppercase">
              Hospital Management
            </p>
            <p className="text-[13px] text-slate-500">Care that feels human</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 max-w-md">
          <h1 className="font-heading max-w-[12ch] text-[2.35rem] leading-[1.1] font-medium tracking-tight text-[#24345c] xl:text-[2.65rem]">
            Hospital care, organized simply
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-500">
            Patients and doctors in one place — appointments, records, and daily care without the
            clutter.
          </p>
        </motion.div>

        <motion.ul variants={itemVariants} className="mt-8 flex flex-wrap gap-2.5">
          {features.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3.5 py-2 text-[12px] font-medium text-[#24345c] shadow-[0_8px_24px_rgba(90,130,180,0.1)] backdrop-blur-md"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#1d2a4a]/8 text-[#1d2a4a]">
                <Icon className="size-3.5" strokeWidth={2} />
              </span>
              {label}
            </li>
          ))}
        </motion.ul>

        <div className="relative mt-auto flex min-h-[280px] flex-1 items-end pt-10">
          <motion.img
            variants={itemVariants}
            src="/landing/hand.png"
            alt=""
            className="hero-hand pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[88%] w-auto max-w-none object-contain object-bottom select-none"
          />

          <motion.div
            variants={itemVariants}
            className="absolute bottom-[38%] left-0"
          >
            <motion.div variants={createFloatVariants(1.2)} animate="animate">
              <Card className="w-[168px] rounded-[1.4rem] border-white/80 bg-white/40 py-4 shadow-[0_18px_50px_rgba(90,130,180,0.16)] ring-0 backdrop-blur-2xl xl:w-[188px]">
                <CardContent className="px-4">
                  <p className="text-[12px] font-medium text-slate-600">Today&apos;s Patients</p>
                  <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500">
                    <span className="flex size-6 items-center justify-center rounded-full bg-[#1d2a4a] text-white">
                      <Users className="size-3" />
                    </span>
                    128 / 150 Beds
                  </div>
                  <p className="mt-6 text-[11px] text-emerald-600">+12% this month</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute top-[8%] right-0 xl:top-[12%]"
          >
            <motion.div variants={createFloatVariants(1.6)} animate="animate">
              <Card className="w-[178px] rounded-[1.4rem] border-white/80 bg-white/40 py-4 shadow-[0_18px_50px_rgba(90,130,180,0.16)] ring-0 backdrop-blur-2xl xl:w-[200px]">
                <CardContent className="px-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-medium text-slate-600">Bed Occupancy</p>
                    <span className="size-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-6 flex h-16 items-end justify-between gap-1.5 px-0.5">
                    {occupancyBars.map((height, index) => (
                      <motion.span
                        key={`${height}-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${height}%`, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.06,
                          ease: "easeOut",
                        }}
                        className={`w-3 rounded-t-md xl:w-3.5 ${
                          index === occupancyBars.length - 1 ? "bg-emerald-400" : "bg-slate-200/90"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>


        <motion.div variants={itemVariants} className="mt-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg bg-transparent px-4 py-2.5 text-[13px] font-medium text-[#24345c] transition-colors hover:border-[#24345c]/35 hover:bg-[#24345c]/5"
          >
            Explore the organization
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </aside>
  )
}
