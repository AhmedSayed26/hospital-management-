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
import AppointmentServices from "@/services/Appointment";
import { toast } from "@/components/ui/toast";
import {
  formatDateTime,
  formatLabel,
  getErrorMessage,
  statusBadgeVariant,
} from "@/shared/utils";

function DetailRow({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm">{value || "—"}</p>
    </div>
  );
}

export default function ViewAppointment({ appointment, open, onOpenChange }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !appointment?.id) return undefined;

    let cancelled = false;

    const loadDetails = async () => {
      setLoading(true);

      try {
        const response = await AppointmentServices.GetAppointmentById(appointment.id);
        if (!cancelled) setDetails(response);
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load appointment"),
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
  }, [open, appointment?.id]);

  useEffect(() => {
    if (!open) setDetails(null);
  }, [open]);

  const data = details ?? appointment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment details</DialogTitle>
          <DialogDescription>
            View appointment information
          </DialogDescription>
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
            <div className="flex items-center justify-between gap-3">
              <DetailRow label="Date & time" value={formatDateTime(data?.date)} />
              {data?.status && (
                <Badge variant={statusBadgeVariant(data.status)} className="text-center">
                  {formatLabel(data.status)}
                </Badge>
              )}
            </div>

            <DetailRow label="Patient" value={data?.patientName} />
            <DetailRow
              label="Condition"
              value={data?.disease ? formatLabel(data.disease) : null}
            />
            <DetailRow label="Doctor" value={data?.doctorName} />
            <DetailRow
              label="Specialty"
              value={data?.specialty ? formatLabel(data.specialty) : null}
            />
            <DetailRow label="Reason" value={data?.reason} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
