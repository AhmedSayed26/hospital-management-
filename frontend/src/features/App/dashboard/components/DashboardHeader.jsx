import { format } from "date-fns";

export default function DashboardHeader({ title, subtitle }) {
  const today = format(new Date(), "EEEE, d MMMM");

  return (
    <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-6 text-primary-foreground shadow-sm sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute -top-12 -right-8 size-40 rounded-full bg-primary-foreground/10" />
      <div className="pointer-events-none absolute -bottom-14 right-28 size-28 rounded-full bg-primary-foreground/10" />
      <p className="relative text-xs font-medium tracking-wide text-primary-foreground/75">
        {today}
      </p>
      <h1 className="font-heading relative mt-2 text-3xl font-medium tracking-tight">
        {title}
      </h1>
      <p className="relative mt-2 max-w-xl text-sm text-primary-foreground/80">
        {subtitle}
      </p>
    </section>
  );
}
