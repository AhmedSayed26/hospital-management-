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
import { Input } from "@/components/ui/input";
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
  emptyAssignValues,
  getAssignValidationSchema,
  getRoomLabel,
} from "../roomsForm";

export default function AssignPatient({ room, open, onOpenChange, onDone }) {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const availablePatients = useMemo(
    () => patients.filter((patient) => !isAdmitted(patient)),
    [patients]
  );

  const patientOptions = useMemo(
    () =>
      availablePatients.map((patient) => ({
        value: String(patient.id),
        label: patient.name ?? `Patient #${patient.id}`,
      })),
    [availablePatients]
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
    initialValues: emptyAssignValues,
    validationSchema: getAssignValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!room?.id) return;

      try {
        await RoomService.AssignPatientToRoom(
          room.id,
          Number(values.patientId),
          Number(values.stayDurationInDays)
        );

        toast.add({
          type: "success",
          title: "Patient assigned",
          description: "The patient was admitted to the room successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onDone?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to assign patient"),
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
            <DialogTitle>Assign patient</DialogTitle>
            <DialogDescription>
              Admit a patient to {getRoomLabel(room)} for a stay duration in days.
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
                          ? "Select patient"
                          : "No available patients"
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
            </div>

            <div className="space-y-1.5">
              <label htmlFor="assign-stay-days" className="text-sm font-medium">
                Stay duration (days)
              </label>
              <Input
                id="assign-stay-days"
                name="stayDurationInDays"
                type="number"
                min="1"
                placeholder="Number of days"
                value={formik.values.stayDurationInDays}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.stayDurationInDays &&
                formik.errors.stayDurationInDays && (
                  <p className="text-sm text-red-500">
                    {formik.errors.stayDurationInDays}
                  </p>
                )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={
                formik.isSubmitting ||
                !room?.id ||
                loadingPatients ||
                patientOptions.length === 0
              }
            >
              {formik.isSubmitting ? "Assigning..." : "Assign patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
