import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { dashboardDateParts, formatDashboardDate } from "./dashboardFormat";

export default function AppointmentRow({ appointment, personLabel, href }) {
  const { day, month } = dashboardDateParts(appointment.date);

  return (
    <Link
      to={href}
      className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-primary/5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-primary/10 py-1.5 text-primary">
          <span className="text-[10px] font-semibold tracking-wide uppercase">{month}</span>
          <span className="font-heading text-lg leading-none font-medium">{day}</span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{personLabel}</p>
          <p className="truncate text-xs text-muted-foreground">
            {formatDashboardDate(appointment.date)}
            {appointment.reason ? ` · ${appointment.reason}` : ""}
          </p>
        </div>
      </div>
      <StatusBadge status={appointment.status} />
    </Link>
  );
}
