import { format } from "date-fns";
import * as Yup from "yup";

export const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const diseaseOptions = [
  { label: "Flu", value: "FLU" },
  { label: "Covid-19", value: "COVID_19" },
  { label: "Diabetes", value: "DIABETES" },
  { label: "Hypertension", value: "HYPERTENSION" },
  { label: "Asthma", value: "ASTHMA" },
  { label: "Cancer", value: "CANCER" },
  { label: "Tuberculosis", value: "TUBERCULOSIS" },
  { label: "Malaria", value: "MALARIA" },
  { label: "Migraine", value: "MIGRAINE" },
  { label: "Heart disease", value: "HEART_DISEASE" },
  { label: "Anxiety", value: "ANXIETY" },
  { label: "Skin rash", value: "SKIN_RASH" },
  { label: "Tonsillitis", value: "TONSILLITIS" },
  { label: "Cataract", value: "CATARACT" },
  { label: "Hepatitis", value: "HEPATITIS" },
  { label: "Ulcer", value: "ULCER" },
  { label: "Kidney stone", value: "KIDNEY_STONE" },
  { label: "Toothache", value: "TOOTHACHE" },
];

export const bloodTypeOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export const emptyPatientValues = {
  name: "",
  age: "",
  email: "",
  address: "",
  phone: "",
  gender: "",
  dateOfRegistration: new Date(),
  bloodType: "",
  disease: "",
  password: "",
};

export function parsePatientDate(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (Array.isArray(value) && value.length >= 3) {
    return new Date(value[0], value[1] - 1, value[2]);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function patientToFormValues(patient) {
  if (!patient) return { ...emptyPatientValues, dateOfRegistration: null };

  return {
    name: patient.name ?? "",
    age: patient.age ?? "",
    email: patient.email ?? "",
    address: patient.address ?? "",
    phone: patient.phone ?? "",
    gender: patient.gender ?? "",
    dateOfRegistration: parsePatientDate(patient.dateOfRegistration),
    bloodType: patient.bloodType ?? "",
    disease: patient.disease ?? "",
    password: "",
  };
}

export function getPatientValidationSchema({ passwordRequired = true } = {}) {
  const password = Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(8, "Password must be at least 8 characters");

  return Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(0, "Age must be 0 or greater")
      .required("Age is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^(01)[0-9]{9}$/, "Phone must be a valid Egyptian number (01XXXXXXXXX)")
      .required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfRegistration: Yup.date()
      .nullable()
      .max(new Date(), "Registration date cannot be in the future")
      .required("Registration date is required"),
    bloodType: Yup.string().required("Blood type is required"),
    disease: Yup.string().required("Disease is required"),
    password: passwordRequired
      ? password.required("Password is required")
      : password.optional(),
  });
}

export function toPatientPayload(values, { id } = {}) {
  const payload = {
    name: values.name.trim(),
    age: Number(values.age),
    email: values.email.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    disease: values.disease,
    bloodType: values.bloodType,
    gender: values.gender,
    dateOfRegistration: values.dateOfRegistration
      ? format(values.dateOfRegistration, "yyyy-MM-dd")
      : null,
  };

  if (id != null) payload.id = id;
  if (values.password) payload.password = values.password;

  return payload;
}
