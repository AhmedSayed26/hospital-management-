import * as Yup from "yup";
import { formatApiDate, formatShortDate, parseDate } from "@/shared/format";

export const emptyPrescriptionValues = {
  patientId: "",
  medicalRecordId: "",
  issueDate: null,
  medicineDescription: "",
};

export function getPrescriptionValidationSchema() {
  return Yup.object({
    patientId: Yup.number()
      .typeError("Patient is required")
      .required("Patient is required"),
    issueDate: Yup.date().nullable().required("Issue date is required"),
    medicineDescription: Yup.string()
      .trim()
      .min(2, "Medicine description must be at least 2 characters")
      .required("Medicine description is required"),
    medicalRecordId: Yup.string(),
  });
}

export function prescriptionToFormValues(prescription) {
  if (!prescription) return { ...emptyPrescriptionValues };

  return {
    patientId: prescription.patientId != null ? String(prescription.patientId) : "",
    medicalRecordId:
      prescription.medicalRecordId != null
        ? String(prescription.medicalRecordId)
        : "",
    issueDate: parseDate(prescription.issueDate),
    medicineDescription: prescription.medicineDescription ?? "",
  };
}

export function toPrescriptionPayload(values, doctorId, id) {
  const payload = {
    medicineDescription: values.medicineDescription.trim(),
    issueDate: formatApiDate(values.issueDate),
    patientId: Number(values.patientId),
    doctorId: Number(doctorId),
  };

  if (values.medicalRecordId) {
    payload.medicalRecordId = Number(values.medicalRecordId);
  }

  if (id != null) {
    payload.id = Number(id);
  }

  return payload;
}

export function getMedicalRecordOptions(records) {
  return (records ?? []).map((record) => ({
    value: String(record.id),
    label: `${record.patientName ?? "Patient"} · ${record.diagnosis ?? "Record"} · ${formatShortDate(record.visitDate)}`,
  }));
}
