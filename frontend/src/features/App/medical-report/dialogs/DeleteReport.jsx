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
import MedicalReportService from "@/services/MedicalReport";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

export default function DeleteReport({ report, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!report?.id) return;

    setDeleting(true);

    try {
      await MedicalReportService.DeleteMedicalReport(report.id);
      toast.add({
        type: "success",
        title: "Medical report deleted",
        description: "The medical report was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete medical report"),
      });
    } finally {
      setDeleting(false);
    }
  };

  const patientName = report?.PatientName ?? report?.patientName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete medical report</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The medical report will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {report && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{patientName ?? "Patient"}</p>
            <p className="text-muted-foreground">
              {formatShortDate(report.reportDate)} · {doctorLabel(report.doctorName)}
            </p>
            <p className="mt-1 font-medium text-foreground">
              {report.reportTitle ?? "Untitled report"}
            </p>
            <p className="mt-1 text-muted-foreground">
              {report.content ?? "No content"}
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
