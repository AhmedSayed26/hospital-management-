import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import PrescriptionService from "@/services/Prescription";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage, sentenceCase } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

function DetailRow({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

export default function ViewPrescription({ prescription, open, onOpenChange }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !prescription?.id) return undefined;

    let cancelled = false;

    const loadDetails = async () => {
      setLoading(true);

      try {
        const response = await PrescriptionService.GetPrescriptionById(
          prescription.id
        );
        if (!cancelled) setDetails(response);
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load prescription"),
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
  }, [open, prescription?.id, onOpenChange]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  const data = details ?? prescription;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Prescription details</DialogTitle>
          <DialogDescription>View prescription information</DialogDescription>
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
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Condition</p>
              {data?.patientDisease ? (
                <Badge variant="secondary" className="font-normal">
                  {sentenceCase(data.patientDisease)}
                </Badge>
              ) : (
                <p className="text-sm">—</p>
              )}
            </div>
            <DetailRow label="Doctor" value={doctorLabel(data?.doctorName)} />
            <DetailRow
              label="Specialty"
              value={sentenceCase(data?.doctorSpecialty)}
            />
            <DetailRow label="Issue date" value={formatShortDate(data?.issueDate)} />
            <DetailRow label="Medicine" value={data?.medicineDescription} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
