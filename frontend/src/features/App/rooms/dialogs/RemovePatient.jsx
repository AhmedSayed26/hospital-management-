import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormik } from "formik";
import RoomService from "@/services/Rooms";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, isAdmitted, toList } from "@/shared/utils";
import {
  emptyRemoveValues,
  getRemoveValidationSchema,
  getRoomLabel,
} from "../roomsForm";

export default function RemovePatient({ room, open, onOpenChange, onDone }) {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const admittedPatients = useMemo(
    () => patients.filter((patient) => isAdmitted(patient)),
    [patients]
  );

  const patientOptions = useMemo(
    () =>
      admittedPatients.map((patient) => ({
        value: String(patient.id),
        label: patient.name ?? `Patient #${patient.id}`,
      })),
    [admittedPatients]
  );

  useEffect(() => {
    if (!open) return;

    let active = true;
    setLoadingPatients(true);

    PatientServices.GetAllPatients()
      .then((response) => {
        if (active) setPatients(toList(response));
      })
      .catch((error) => {
        if (!active) return;
        setPatients([]);
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load patients"),
        });
      })
      .finally(() => {
        if (active) setLoadingPatients(false);
      });

    return () => {
      active = false;
    };
  }, [open]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: emptyRemoveValues,
    validationSchema: getRemoveValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!room?.id) return;

      try {
        await RoomService.RemovePatientFromRoom(
          room.id,
          Number(values.patientId)
        );

        toast.add({
          type: "success",
          title: "Patient discharged",
          description: "The patient was removed from the room successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onDone?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to discharge patient"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      formik.resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Discharge patient</DialogTitle>
            <DialogDescription>
              Remove an admitted patient from {getRoomLabel(room)}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 px-1 py-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Patient</label>
              <Select
                items={patientOptions}
                value={formik.values.patientId || null}
                onValueChange={(value) =>
                  formik.setFieldValue("patientId", value ?? "")
                }
                disabled={loadingPatients || patientOptions.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      loadingPatients
                        ? "Loading patients..."
                        : patientOptions.length
                          ? "Select admitted patient"
                          : "No admitted patients"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {patientOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.patientId && formik.errors.patientId && (
                <p className="text-sm text-red-500">{formik.errors.patientId}</p>
              )}
              {!loadingPatients && patientOptions.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  If the selected patient is not in this room, the server will return an error.
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              disabled={
                formik.isSubmitting ||
                !room?.id ||
                loadingPatients ||
                patientOptions.length === 0
              }
            >
              {formik.isSubmitting ? "Discharging..." : "Discharge patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
