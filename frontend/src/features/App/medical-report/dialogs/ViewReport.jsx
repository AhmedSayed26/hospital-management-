import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import MedicalReportService from "@/services/MedicalReport";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

function DetailRow({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm whitespace-pre-wrap">{value || "—"}</p>
    </div>
  );
}

export default function ViewReport({ report, open, onOpenChange }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !report?.id) return undefined;

    let cancelled = false;

    const loadDetails = async () => {
      setLoading(true);

      try {
        const response = await MedicalReportService.GetMedicalReportById(report.id);
        if (!cancelled) setDetails(response);
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load medical report"),
        });
        if (!cancelled) onOpenChange?.(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDetails();

    return () => {
      cancelled = true;
    };
  }, [open, report?.id, onOpenChange]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  const data = details ?? report;
  const patientName = data?.PatientName ?? data?.patientName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Medical report details</DialogTitle>
          <DialogDescription>View medical report information</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="grid gap-4">
            <DetailRow label="Report title" value={data?.reportTitle} />
            <DetailRow label="Report date" value={formatShortDate(data?.reportDate)} />
            <DetailRow label="Patient" value={patientName} />
            <DetailRow label="Doctor" value={doctorLabel(data?.doctorName)} />
            <DetailRow label="Content" value={data?.content} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
