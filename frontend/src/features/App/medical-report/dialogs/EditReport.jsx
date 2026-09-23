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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataPicker } from "@/components/ui/dataPicker";
import { useFormik } from "formik";
import MedicalReportService from "@/services/MedicalReport";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toSelectOptions } from "@/shared/utils";
import { useMedicalReportOptions } from "../useMedicalReportOptions";
import {
  getMedicalRecordOptions,
  getMedicalReportValidationSchema,
  reportToFormValues,
  toMedicalReportPayload,
} from "../medicalReportForm";

export default function EditReport({ report, open, onOpenChange, onSaved }) {
  const { patients, doctors, medicalRecords, loading } = useMedicalReportOptions({ open });
  const patientOptions = toSelectOptions(patients, "disease");
  const doctorOptions = toSelectOptions(doctors, "specialty");
  const fieldIdPrefix = `edit-report-${report?.id ?? "new"}`;

  const initialValues = useMemo(() => reportToFormValues(report), [report]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: getMedicalReportValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!report?.id) return;

      try {
        await MedicalReportService.UpdateMedicalReport(
          report.id,
          toMedicalReportPayload(values)
        );

        toast.add({
          type: "success",
          title: "Medical report updated",
          description: "The medical report was saved successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onSaved?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to update medical report"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const filteredRecords = useMemo(() => {
    if (!formik.values.patientId) return [];
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
            <DialogTitle>Edit Medical Report</DialogTitle>
            <DialogDescription>Update medical report details</DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-3 overflow-y-auto px-1 py-1">
            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-title`} className="text-sm font-medium">
                Report title
              </label>
              <Input
                id={`${fieldIdPrefix}-title`}
                name="reportTitle"
                placeholder="Report title"
                value={formik.values.reportTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.reportTitle && formik.errors.reportTitle && (
                <p className="text-sm text-red-500">{formik.errors.reportTitle}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-date`} className="text-sm font-medium">
                Report date
              </label>
              <DataPicker
                id={`${fieldIdPrefix}-date`}
                name="reportDate"
                placeholder="Pick a report date"
                date={formik.values.reportDate}
                onDateChange={(date) => {
                  formik.setFieldValue("reportDate", date ?? null);
                  formik.setFieldTouched("reportDate", true, false);
                }}
              />
              {formik.touched.reportDate && formik.errors.reportDate && (
                <p className="text-sm text-red-500">{formik.errors.reportDate}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-content`} className="text-sm font-medium">
                Content
              </label>
              <textarea
                id={`${fieldIdPrefix}-content`}
                name="content"
                rows={4}
                placeholder="Report content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-24 w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              {formik.touched.content && formik.errors.content && (
                <p className="text-sm text-red-500">{formik.errors.content}</p>
              )}
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Patient</label>
                <Select
                  items={patientOptions}
                  value={formik.values.patientId || null}
                  onValueChange={handlePatientChange}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={loading ? "Loading..." : "Select a patient"} />
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
                <label className="text-sm font-medium">Doctor</label>
                <Select
                  items={doctorOptions}
                  value={formik.values.doctorId || null}
                  onValueChange={(value) => formik.setFieldValue("doctorId", value ?? "")}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={loading ? "Loading..." : "Select a doctor"} />
                  </SelectTrigger>
                  <SelectContent>
                    {doctorOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.doctorId && formik.errors.doctorId && (
                  <p className="text-sm text-red-500">{formik.errors.doctorId}</p>
                )}
              </div>
            </div>


            <div className="space-y-1.5">
              <label className="text-sm font-medium">Medical record</label>
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
                          ? "Select a medical record"
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
              {formik.touched.medicalRecordId && formik.errors.medicalRecordId && (
                <p className="text-sm text-red-500">{formik.errors.medicalRecordId}</p>
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
