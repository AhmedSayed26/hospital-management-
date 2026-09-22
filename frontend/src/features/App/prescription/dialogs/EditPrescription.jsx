import { useMemo } from "react";
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
import { DataPicker } from "@/components/ui/dataPicker";
import { useFormik } from "formik";
import PrescriptionService from "@/services/Prescription";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toSelectOptions } from "@/shared/utils";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { usePrescriptionOptions } from "../usePrescriptionOptions";
import {
  getMedicalRecordOptions,
  getPrescriptionValidationSchema,
  prescriptionToFormValues,
  toPrescriptionPayload,
} from "../prescriptionForm";

export default function EditPrescription({ prescription, open, onOpenChange, onSaved }) {
  const { user } = useAuth();
  const { patients, medicalRecords, loading } = usePrescriptionOptions({
    open,
    doctorId: user?.id,
  });
  const patientOptions = toSelectOptions(patients, "disease");
  const fieldIdPrefix = `edit-prescription-${prescription?.id ?? "new"}`;

  const initialValues = useMemo(
    () => prescriptionToFormValues(prescription),
    [prescription]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: getPrescriptionValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!prescription?.id || user?.id == null) return;

      try {
        await PrescriptionService.UpdatePrescription(
          prescription.id,
          toPrescriptionPayload(values, user.id, prescription.id)
        );

        toast.add({
          type: "success",
          title: "Prescription updated",
          description: "The prescription was saved successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onSaved?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to update prescription"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const filteredRecords = useMemo(() => {
    if (!formik.values.patientId) return medicalRecords;
    return medicalRecords.filter(
      (record) => String(record.patientId) === String(formik.values.patientId)
    );
  }, [medicalRecords, formik.values.patientId]);

  const medicalRecordOptions = getMedicalRecordOptions(filteredRecords);

  const handlePatientChange = (value) => {
    formik.setFieldValue("patientId", value ?? "");
    formik.setFieldValue("medicalRecordId", "");
  };

  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) formik.resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Edit Prescription</DialogTitle>
            <DialogDescription>Update prescription details</DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-3 overflow-y-auto px-1 py-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Patient</label>
              <Select
                items={patientOptions}
                value={formik.values.patientId || null}
                onValueChange={handlePatientChange}
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
              <label className="text-sm font-medium">Medical record (optional)</label>
              <Select
                items={medicalRecordOptions}
                value={formik.values.medicalRecordId || null}
                onValueChange={(value) =>
                  formik.setFieldValue("medicalRecordId", value ?? "")
                }
                disabled={loading || !formik.values.patientId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      !formik.values.patientId
                        ? "Select a patient first"
                        : medicalRecordOptions.length
                          ? "Link to a medical record"
                          : "No records for this patient"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {medicalRecordOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-date`} className="text-sm font-medium">
                Issue date
              </label>
              <DataPicker
                id={`${fieldIdPrefix}-date`}
                name="issueDate"
                placeholder="Pick an issue date"
                date={formik.values.issueDate}
                onDateChange={(date) => {
                  formik.setFieldValue("issueDate", date ?? null);
                  formik.setFieldTouched("issueDate", true, false);
                }}
              />
              {formik.touched.issueDate && formik.errors.issueDate && (
                <p className="text-sm text-red-500">{formik.errors.issueDate}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor={`${fieldIdPrefix}-medicine`}
                className="text-sm font-medium"
              >
                Medicine description
              </label>
              <textarea
                id={`${fieldIdPrefix}-medicine`}
                name="medicineDescription"
                rows={4}
                placeholder="Medication, dosage, and instructions"
                value={formik.values.medicineDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-24 w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {formik.touched.medicineDescription &&
                formik.errors.medicineDescription && (
                  <p className="text-sm text-red-500">
                    {formik.errors.medicineDescription}
                  </p>
                )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={formik.isSubmitting || loading}>
              {formik.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
