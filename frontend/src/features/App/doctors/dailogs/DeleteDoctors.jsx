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
import DoctorService from "@/services/Doctor";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";

export default function DeleteDoctors({ doctor, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!doctor?.id) return;

    setDeleting(true);

    try {
      await DoctorService.DeleteDoctor(doctor.id);
      toast.add({
        type: "success",
        title: "Doctor deleted",
        description: "The doctor was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete doctor"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete doctor</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The doctor will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {doctor && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{doctor.name ?? "Unnamed doctor"}</p>
            <p className="text-muted-foreground">{doctor.email ?? "No email"}</p>
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
            disabled={deleting || !doctor?.id}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
