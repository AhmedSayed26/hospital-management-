import * as Yup from "yup";
import { formatApiDate, parseDate } from "@/shared/format";

export const emptyMedicalRecordValues = {
  patientId: "",
  visitDate: null,
  diagnosis: "",
  treatment: "",
  notes: "",
};

export function getMedicalRecordValidationSchema() {
  return Yup.object({
    patientId: Yup.number()
      .typeError("Patient is required")
      .required("Patient is required"),
    visitDate: Yup.date().nullable().required("Visit date is required"),
    diagnosis: Yup.string()
      .trim()
      .min(2, "Diagnosis must be at least 2 characters")
      .required("Diagnosis is required"),
    treatment: Yup.string()
      .trim()
      .min(2, "Treatment must be at least 2 characters")
      .required("Treatment is required"),
    notes: Yup.string().trim().max(1000, "Notes must be at most 1000 characters"),
  });
}

export function recordToFormValues(record) {
  if (!record) return { ...emptyMedicalRecordValues };

  return {
    patientId: record.patientId != null ? String(record.patientId) : "",
    visitDate: parseDate(record.visitDate),
    diagnosis: record.diagnosis ?? "",
    treatment: record.treatment ?? "",
    notes: record.notes ?? "",
  };
}

export function toMedicalRecordPayload(values, doctorId) {
  return {
    patientId: Number(values.patientId),
    doctorId: Number(doctorId),
    visitDate: formatApiDate(values.visitDate),
    diagnosis: values.diagnosis.trim(),
    treatment: values.treatment.trim(),
    notes: values.notes?.trim() || "",
  };
}
