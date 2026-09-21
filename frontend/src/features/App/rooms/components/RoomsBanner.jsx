import { getRoomsSummary } from "../roomsForm";

function AvailabilityRing({ percent }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex size-24 items-center justify-center">
      <svg
        className="size-24 -rotate-90 text-primary-foreground"
        viewBox="0 0 80 80"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          className="stroke-current opacity-25"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          className="stroke-current"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
        <span className="text-lg font-semibold">{percent}%</span>
        <span className="text-[10px] uppercase tracking-wide text-primary-foreground/80">
          Available
        </span>
      </div>
    </div>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-center backdrop-blur-sm">
      <p className="text-xl font-semibold text-primary-foreground">{value}</p>
      <p className="text-xs text-primary-foreground/75">{label}</p>
    </div>
  );
}

export default function RoomsBanner({ rooms }) {
  const summary = getRoomsSummary(rooms);

  return (
    <section className="overflow-hidden rounded-2xl bg-primary px-5 py-6 text-primary-foreground shadow-sm sm:px-8 sm:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-2">
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
            Available rooms and beds
          </h1>
          <p className="text-sm text-primary-foreground/75 sm:text-base">
            Track each room status and assign the right bed in seconds.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <StatChip label="Rooms" value={summary.totalRooms} />
            <StatChip label="Empty beds" value={summary.emptyBeds} />
            <StatChip label="Total beds" value={summary.totalBeds} />
          </div>
          <AvailabilityRing percent={summary.availabilityPercent} />
        </div>
      </div>
    </section>
  );
}
