import * as Yup from "yup";
import { formatApiDate, formatShortDate, parseDate } from "@/shared/format";

export const emptyMedicalReportValues = {
  reportTitle: "",
  reportDate: null,
  content: "",
  patientId: "",
  doctorId: "",
  medicalRecordId: "",
};


export function getMedicalReportValidationSchema() {
    return Yup.object({
        reportTitle: Yup.string().trim().required("Report title is required"),
        reportDate: Yup.date().nullable().required("Report date is required"),
        content: Yup.string().trim().required("Content is required"),
        patientId: Yup.number()
            .typeError("Patient is required")
            .required("Patient is required"),
        doctorId: Yup.number()
            .typeError("Doctor is required")
            .required("Doctor is required"),
        medicalRecordId: Yup.number()
            .typeError("Medical record is required")
            .required("Medical record is required"),
    });
}

export function reportToFormValues(report) {
    if (!report) return { ...emptyMedicalReportValues };

    return {
        reportTitle: report.reportTitle ?? "",
        reportDate: parseDate(report.reportDate),
        content: report.content ?? "",
        patientId: report.patientId != null ? String(report.patientId) : "",
        doctorId: report.doctorId != null ? String(report.doctorId) : "",
        medicalRecordId:
            report.medicalRecordId != null ? String(report.medicalRecordId) : "",
    };
}

export function toMedicalReportPayload(values) {
    return {
        reportTitle: values.reportTitle.trim(),
        reportDate: formatApiDate(values.reportDate),
        content: values.content.trim(),
        patientId: Number(values.patientId),
        doctorId: Number(values.doctorId),
        medicalRecordId: Number(values.medicalRecordId),
    };
}

export function getMedicalRecordOptions(records) {
    return (records ?? []).map((record) => ({
        value: String(record.id),
        label: `${record.patientName ?? "Patient"} · ${record.diagnosis ?? "Record"} · ${formatShortDate(record.visitDate)}`,
    }));
}