import { format } from "date-fns";
import {
  Clock,
  Eye,
  FlaskConical,
  Heart,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatLabel } from "@/shared/utils";

function sentenceCase(value) {
  const label = formatLabel(value);
  if (!label) return "";
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function dateParts(iso) {
  if (!iso) {
    return { dayName: "—", day: "—", month: "—", time: "—" };
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return { dayName: "—", day: "—", month: "—", time: "—" };
  }

  return {
    dayName: format(date, "EEE"),
    day: format(date, "d"),
    month: format(date, "MMM"),
    time: format(date, "h:mm a"),
  };
}

function doctorLabel(name) {
  if (!name) return "Doctor";
  return /^dr\.?\s/i.test(name) ? name : `Dr ${name}`;
}

function statusBadgeClass(status) {
  switch (status) {
    case "CONFIRMED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400";
    case "CANCELED":
      return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400";
    case "COMPLETED":
      return "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300";
    case "PENDING":
    default:
      return "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400";
  }
}

function MetaItem({ icon: Icon, children }) {
  if (!children) return null;

  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Icon className="size-3.5 shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}

export default function AppointmentCard({ appointment, onAction }) {
  const { dayName, day, month, time } = dateParts(appointment.date);

  return (
    <Card className="flex-row items-stretch gap-0 overflow-hidden py-0 !border-none shadow-none outline-none">
      <div className="flex w-[4.75rem] shrink-0 flex-col items-center justify-between bg-blue-100 px-2 py-3 text-blue-700 dark:bg-primary/20 dark:text-primary">
        <div className="flex flex-col items-center leading-none">
          <span className="text-[11px] font-medium">{dayName}</span>
          <span className="mt-1 text-[1.7rem] font-bold tracking-tight">{day}</span>
          <span className="mt-1 text-[11px] font-medium">{month}</span>
        </div>
        <span className="text-[11px] font-semibold">{time}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-foreground">
              {appointment.patientName ?? "Patient"}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {appointment.reason || "No reason provided"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {appointment.status && (
              <Badge
                variant="secondary"
                className={`h-6 gap-1.5 border-transparent px-2.5 ${statusBadgeClass(appointment.status)}`}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {sentenceCase(appointment.status)}
              </Badge>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                  />
                }
              >
                <MoreHorizontal />
                <span className="sr-only">Open menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onAction(appointment, "view")}>
                  <Eye />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(appointment, "edit")}>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onAction(appointment, "delete")}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <MetaItem icon={Clock}>{doctorLabel(appointment.doctorName)}</MetaItem>
          <MetaItem icon={Heart}>
            {appointment.disease ? sentenceCase(appointment.disease) : null}
          </MetaItem>
          <MetaItem icon={FlaskConical}>
            {appointment.specialty ? sentenceCase(appointment.specialty) : null}
          </MetaItem>
        </div>
      </div>
    </Card>
  );
}
