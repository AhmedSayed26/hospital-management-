import { Calendar, Sparkles } from "lucide-react"

export default function CareSection() {
  return (
    <section id="about" className="landing-section relative bg-white px-4 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-heading max-w-[13ch] text-[2.4rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[3.15rem]">
          Bringing Hospital Care Into Everyday Life
        </h2>
        <p className="max-w-[250px] text-[15px] leading-relaxed text-slate-500 sm:pb-1 sm:text-right">
          Hospital Management was created to make hospital care more accessible
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-end">
        <div className="flex shrink-0 flex-col items-center gap-4 lg:mb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-slate-300" />
            <span className="size-1.5 rounded-full bg-slate-700" />
          </div>
          <img
            src="/landing/phone-small.png"
            alt="A person checking the hospital app outdoors"
            className="h-[118px] w-[158px] rounded-[1.35rem] object-cover shadow-[0_12px_30px_rgba(80,110,150,0.16)]"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-6 md:flex-row md:items-end">
          <div className="relative min-w-0 flex-[1.35]">
            <img
              src="/landing/guidance.png"
              alt="A clinician reviewing a personalized hospital care plan"
              className="h-64 w-full rounded-[1.85rem] object-cover shadow-[0_18px_40px_rgba(80,110,150,0.14)] md:h-[300px]"
            />
            <article className="relative z-10 mx-4 right-5 -mt-14 flex h-auto flex-col justify-between rounded-[1.7rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_40px_rgba(80,110,150,0.1)] md:absolute md:top-12 md:-right-16 md:mx-0 md:mt-0 md:h-[236px] md:w-[236px]">
              <div>
                <h3 className="text-[17px] font-semibold tracking-tight text-[#24345c]">
                  Personalized Care
                </h3>
                <p className="mt-7 max-w-[14ch] text-[13px] leading-relaxed text-slate-400">
                  Appointments, records, and hospital support
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 md:mt-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-500">
                  <Sparkles className="size-3.5" />
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-500" >
                  <Calendar className="size-3.5" />
                </span>
              </div>
            </article>
          </div>

          <figure id="patients" className="min-w-0 flex-1 md:ml-20">
            <img
              src="/landing/people.png"
              alt="Two people talking by a window"
              className="h-52 w-full rounded-[1.5rem] object-cover shadow-[0_14px_34px_rgba(80,110,150,0.12)] md:h-[214px]"
            />
            <figcaption className="mt-3 text-[13px] whitespace-nowrap text-slate-500">
              Built Around Patients
            </figcaption>
          </figure>

          <figure className="min-w-0 flex-1">
            <img
              src="/landing/sunlight.png"
              alt="Person reaching toward sunlight"
              className="h-52 w-full rounded-[1.5rem] object-cover shadow-[0_14px_34px_rgba(80,110,150,0.12)] md:h-[214px]"
            />
            <figcaption className="mt-3 text-[13px] whitespace-nowrap text-slate-500">
              Built For Doctors
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
