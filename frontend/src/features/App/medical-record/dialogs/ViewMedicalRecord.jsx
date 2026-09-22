import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import MedicalRecordService from "@/services/MedicalRecord";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

function DetailRow({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

export default function ViewMedicalRecord({ record, open, onOpenChange }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !record?.id) return undefined;

    let cancelled = false;

    const loadDetails = async () => {
      setLoading(true);

      try {
        const response = await MedicalRecordService.GetMedicalRecordById(record.id);
        if (!cancelled) setDetails(response);
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load medical record"),
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
  }, [open, record?.id, onOpenChange]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  const data = details ?? record;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Medical record details</DialogTitle>
          <DialogDescription>View medical record information</DialogDescription>
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
            <DetailRow label="Patient" value={data?.patientName} />
            <DetailRow label="Doctor" value={doctorLabel(data?.doctorName)} />
            <DetailRow label="Visit date" value={formatShortDate(data?.visitDate)} />
            <DetailRow label="Diagnosis" value={data?.diagnosis} />
            <DetailRow label="Treatment" value={data?.treatment} />
            <DetailRow label="Notes" value={data?.notes} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
