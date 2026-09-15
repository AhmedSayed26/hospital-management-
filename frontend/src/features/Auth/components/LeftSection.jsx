export default function LeftSection() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#1d2a4a] lg:block">
      <img
        src="/landing/sky.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d2a4a]/30 via-[#24345c]/40 to-[#1d2a4a]/80" />
      <div className="relative z-10 flex h-full flex-col justify-center px-12">
        <p className="text-[13px] font-medium tracking-wide text-white/70">Hospital Management</p>
        <h1 className="font-heading mt-3 max-w-[12ch] text-4xl leading-tight font-medium text-white">
          Hospital care, organized simply
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/75">
          Patients and doctors in one place — appointments, records, and daily care.
        </p>
      </div>
    </aside>
  )
}
