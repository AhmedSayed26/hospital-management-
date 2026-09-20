import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppointmentServices from "@/services/Appointment";
import { toast } from "@/components/ui/toast";
import { formatDateTime, getErrorMessage } from "@/shared/utils";

export default function DeleteAppointment({ appointment, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!appointment?.id) return;

    setDeleting(true);

    try {
      await AppointmentServices.DeleteAppointment(appointment.id);
      toast.add({
        type: "success",
        title: "Appointment deleted",
        description: "The appointment was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete appointment"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete appointment</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The appointment will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{appointment.patientName ?? "Patient"}</p>
            <p className="text-muted-foreground">
              {formatDateTime(appointment.date)} · {appointment.doctorName ?? "Doctor"}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
