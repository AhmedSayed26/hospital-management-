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
import MedicalRecordService from "@/services/MedicalRecord";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

export default function DeleteMedicalRecord({ record, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!record?.id) return;

    setDeleting(true);

    try {
      await MedicalRecordService.DeleteMedicalRecord(record.id);
      toast.add({
        type: "success",
        title: "Medical record deleted",
        description: "The medical record was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete medical record"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete medical record</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The medical record will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {record && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{record.patientName ?? "Patient"}</p>
            <p className="text-muted-foreground">
              {formatShortDate(record.visitDate)} ·{" "}
              {doctorLabel(record.doctorName)}
            </p>
            <p className="mt-1 text-muted-foreground">
              {record.diagnosis ?? "No diagnosis"}
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
