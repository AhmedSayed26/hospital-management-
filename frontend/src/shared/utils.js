import { differenceInCalendarDays, format, isValid } from "date-fns";

export const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Canceled", value: "CANCELED" },
  { label: "Completed", value: "COMPLETED" },
];

export const diseaseToSpecialty = {
  FLU: "INTERNAL_MEDICINE",
  COVID_19: "INFECTIOUS_DISEASES",
  DIABETES: "ENDOCRINOLOGY",
  HYPERTENSION: "CARDIOLOGY",
  ASTHMA: "INTERNAL_MEDICINE",
  CANCER: "ONCOLOGY",
  TUBERCULOSIS: "INFECTIOUS_DISEASES",
  MALARIA: "INFECTIOUS_DISEASES",
  MIGRAINE: "NEUROLOGY",
  HEART_DISEASE: "CARDIOLOGY",
  ANXIETY: "PSYCHIATRY",
  SKIN_RASH: "DERMATOLOGY",
  TONSILLITIS: "ENT",
  CATARACT: "OPHTHALMOLOGY",
  HEPATITIS: "GASTROENTEROLOGY",
  ULCER: "GASTROENTEROLOGY",
  KIDNEY_STONE: "UROLOGY",
  TOOTHACHE: "DENTISTRY",
};

export function toList(response) {
  return Array.isArray(response) ? response : response?.data ?? [];
}

export function formatLabel(value) {
  if (!value) return "";
  return String(value).replaceAll("_", " ").toLowerCase();
}

export function sentenceCase(value) {
  const label = formatLabel(value);
  if (!label) return "—";
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function getInitials(name) {
  if (!name) return "P";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return isValid(value) ? value : null;

  if (Array.isArray(value) && value.length >= 3) {
    const date = new Date(
      value[0],
      value[1] - 1,
      value[2],
      value[3] || 0,
      value[4] || 0,
      value[5] || 0
    );
    return isValid(date) ? date : null;
  }

  const date = new Date(value);
  return isValid(date) ? date : null;
}

export function formatShortDate(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return format(date, "d MMM yyyy");
}

export function formatAppointmentWhen(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return `${format(date, "d MMM yyyy")} · ${format(date, "HH:mm")}`;
}

export function doctorLabel(name) {
  if (!name) return "Doctor";
  return /^dr\.?\s/i.test(name) ? name : `Dr. ${name}`;
}

export function isAdmitted(patient) {
  return Boolean(patient?.isAdmitted ?? patient?.admitted);
}

export function getAppointments(patient) {
  return toList(patient?.appointments).slice().sort((a, b) => {
    const left = parseDate(a?.date)?.getTime() ?? 0;
    const right = parseDate(b?.date)?.getTime() ?? 0;
    return right - left;
  });
}

export function getAdmissionStay(patient) {
  const admit = parseDate(patient?.admitDate);
  const end = parseDate(patient?.roomEndDate);
  if (!admit || !end) return null;

  const totalDays = Math.max(1, differenceInCalendarDays(end, admit));
  const elapsed = differenceInCalendarDays(new Date(), admit);
  const currentDay = Math.min(totalDays, Math.max(1, elapsed + 1));
  const daysLeft = Math.max(0, differenceInCalendarDays(end, new Date()));

  return {
    currentDay,
    totalDays,
    daysLeft,
    percent: Math.round((currentDay / totalDays) * 100),
  };
}

export function combineDateAndTime(date, time) {
  const [hours, minutes] = time.split(":").map(Number);
  const next = new Date(date);
  next.setHours(hours || 0, minutes || 0, 0, 0);
  return next;
}

export function getErrorMessage(error, fallback = "Something went wrong") {
  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  return data?.message || data?.error || error.message || fallback;
}

export function getRequiredSpecialty(patient) {
  if (!patient?.disease) return null;
  return diseaseToSpecialty[patient.disease] ?? null;
}

export function getVisibleDoctors(doctors, specialty) {
  if (!specialty) return doctors;
  return doctors.filter((doctor) => doctor.specialty === specialty);
}

export function toSelectOptions(items, extraKey) {
  return items.map((item) => ({
    value: String(item.id),
    label: item[extraKey]
      ? `${item.name} · ${formatLabel(item[extraKey])}`
      : item.name,
  }));
}

export function splitDateAndTime(iso) {
  if (!iso) return { date: null, time: "09:00" };

  const date = new Date(iso);
  return {
    date,
    time: format(date, "HH:mm"),
  };
}

export function formatDateTime(iso) {
  if (!iso) return "";
  return format(new Date(iso), "PPp");
}

export function statusBadgeVariant(status) {
  switch (status) {
    case "CONFIRMED":
      return "default";
    case "CANCELED":
      return "destructive";
    case "COMPLETED":
      return "secondary";
    case "PENDING":
    default:
      return "outline";
  }
}
