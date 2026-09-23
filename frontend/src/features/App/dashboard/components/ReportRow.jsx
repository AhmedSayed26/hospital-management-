import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { doctorLabel } from "@/shared/utils";
import { formatDashboardDay } from "./dashboardFormat";

export default function ReportRow({ report, showPatient }) {
  const who = showPatient
    ? report.patientName || "Patient"
    : doctorLabel(report.doctorName);

  return (
    <Link
      to="/app/reports"
      className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-primary/5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <ClipboardList className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">
          {report.reportTitle || "Report"}
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {who} · {formatDashboardDay(report.reportDate)}
        </span>
      </span>
    </Link>
  );
}
