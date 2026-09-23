import { format } from "date-fns";
import { parseDate } from "@/shared/format";

export function formatDashboardDate(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return format(date, "d MMM yyyy, h:mm a");
}

export function formatDashboardDay(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return format(date, "d MMM yyyy");
}

export function dashboardDateParts(value) {
  const date = parseDate(value);
  if (!date) return { day: "—", month: "—" };
  return { day: format(date, "d"), month: format(date, "MMM") };
}
