import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { doctorLabel } from "@/shared/utils";
import { formatDashboardDay } from "./dashboardFormat";

export default function PrescriptionRow({ prescription }) {
  return (
    <Link
      to="/app/prescriptions"
      className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-primary/5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Pill className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 block text-sm font-medium text-foreground">
          {prescription.medicineDescription || "Prescription"}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {doctorLabel(prescription.doctorName)} · {formatDashboardDay(prescription.issueDate)}
        </span>
      </span>
    </Link>
  );
}
