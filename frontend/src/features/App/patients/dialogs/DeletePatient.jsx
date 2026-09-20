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
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";

export default function DeletePatient({ patient, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!patient?.id) return;

    setDeleting(true);

    try {
      await PatientServices.DeletePatient(patient.id);
      toast.add({
        type: "success",
        title: "Patient deleted",
        description: "The patient was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete patient"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete patient</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The patient will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {patient && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{patient.name ?? "Unnamed patient"}</p>
            <p className="text-muted-foreground">{patient.email ?? "No email"}</p>
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
            disabled={deleting || !patient?.id}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
