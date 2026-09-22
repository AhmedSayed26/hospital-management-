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
import PrescriptionService from "@/services/Prescription";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

export default function DeletePrescription({ prescription, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!prescription?.id) return;

    setDeleting(true);

    try {
      await PrescriptionService.DeletePrescription(prescription.id);
      toast.add({
        type: "success",
        title: "Prescription deleted",
        description: "The prescription was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete prescription"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete prescription</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The prescription will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {prescription && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{prescription.patientName ?? "Patient"}</p>
            <p className="text-muted-foreground">
              {formatShortDate(prescription.issueDate)} ·{" "}
              {doctorLabel(prescription.doctorName)}
            </p>
            <p className="mt-1 text-muted-foreground">
              {prescription.medicineDescription ?? "No medicine description"}
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
