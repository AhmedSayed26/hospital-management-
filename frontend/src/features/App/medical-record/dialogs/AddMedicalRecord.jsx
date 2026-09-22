import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
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
import { DataPicker } from "@/components/ui/dataPicker";
import { useFormik } from "formik";
import MedicalRecordService from "@/services/MedicalRecord";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toSelectOptions } from "@/shared/utils";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useMedicalRecordOptions } from "../useMedicalRecordOptions";
import {
  emptyMedicalRecordValues,
  getMedicalRecordValidationSchema,
  toMedicalRecordPayload,
} from "../medicalRecordForm";

export default function AddMedicalRecord({ onCreated }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { patients, loading } = useMedicalRecordOptions({ open });
  const patientOptions = toSelectOptions(patients, "disease");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: emptyMedicalRecordValues,
    validationSchema: getMedicalRecordValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (user?.id == null) return;

      try {
        await MedicalRecordService.CreateMedicalRecord(
          toMedicalRecordPayload(values, user.id)
        );

        toast.add({
          type: "success",
          title: "Medical record created",
          description: "The medical record was added successfully",
        });

        resetForm();
        setOpen(false);
        onCreated?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to create medical record"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) formik.resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" type="button" />}>
        Add Medical Record
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add Medical Record</DialogTitle>
            <DialogDescription>
              Create a new medical record for a patient
            </DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-3 overflow-y-auto px-1 py-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Patient</label>
              <Select
                items={patientOptions}
                value={formik.values.patientId || null}
                onValueChange={(value) =>
                  formik.setFieldValue("patientId", value ?? "")
                }
                disabled={loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={loading ? "Loading..." : "Select a patient"}
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
              <label htmlFor="add-record-date" className="text-sm font-medium">
                Visit date
              </label>
              <DataPicker
                id="add-record-date"
                name="visitDate"
                placeholder="Pick a visit date"
                date={formik.values.visitDate}
                onDateChange={(date) => {
                  formik.setFieldValue("visitDate", date ?? null);
                  formik.setFieldTouched("visitDate", true, false);
                }}
              />
              {formik.touched.visitDate && formik.errors.visitDate && (
                <p className="text-sm text-red-500">{formik.errors.visitDate}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="add-record-diagnosis" className="text-sm font-medium">
                Diagnosis
              </label>
              <Input
                id="add-record-diagnosis"
                name="diagnosis"
                placeholder="Diagnosis"
                value={formik.values.diagnosis}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.diagnosis && formik.errors.diagnosis && (
                <p className="text-sm text-red-500">{formik.errors.diagnosis}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="add-record-treatment" className="text-sm font-medium">
                Treatment
              </label>
              <Input
                id="add-record-treatment"
                name="treatment"
                placeholder="Treatment"
                value={formik.values.treatment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.treatment && formik.errors.treatment && (
                <p className="text-sm text-red-500">{formik.errors.treatment}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="add-record-notes" className="text-sm font-medium">
                Notes
              </label>
              <textarea
                id="add-record-notes"
                name="notes"
                rows={3}
                placeholder="Additional notes (optional)"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-20 w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {formik.touched.notes && formik.errors.notes && (
                <p className="text-sm text-red-500">{formik.errors.notes}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={formik.isSubmitting || loading}>
              {formik.isSubmitting ? "Saving..." : "Add Medical Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
