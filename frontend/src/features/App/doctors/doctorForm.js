import * as Yup from "yup";

export const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

export const specialtyOptions = [
  { label: "Cardiology", value: "CARDIOLOGY" },
  { label: "Neurology", value: "NEUROLOGY" },
  { label: "Orthopedics", value: "ORTHOPEDICS" },
  { label: "Dermatology", value: "DERMATOLOGY" },
  { label: "Pediatrics", value: "PEDIATRICS" },
  { label: "Psychiatry", value: "PSYCHIATRY" },
  { label: "General surgery", value: "GENERAL_SURGERY" },
  { label: "Internal medicine", value: "INTERNAL_MEDICINE" },
  { label: "ENT", value: "ENT" },
  { label: "Ophthalmology", value: "OPHTHALMOLOGY" },
  { label: "Infectious diseases", value: "INFECTIOUS_DISEASES" },
  { label: "Endocrinology", value: "ENDOCRINOLOGY" },
  { label: "Oncology", value: "ONCOLOGY" },
  { label: "Gastroenterology", value: "GASTROENTEROLOGY" },
  { label: "Urology", value: "UROLOGY" },
  { label: "Dentistry", value: "DENTISTRY" },
];

export const emptyDoctorValues = {
  name: "",
  age: "",
  email: "",
  address: "",
  phone: "",
  gender: "",
  specialty: "",
  yearOfExperience: "",
  password: "",
};

export function doctorToFormValues(doctor) {
  if (!doctor) return { ...emptyDoctorValues };

  return {
    name: doctor.name ?? "",
    age: doctor.age ?? "",
    email: doctor.email ?? "",
    address: doctor.address ?? "",
    phone: doctor.phone ?? "",
    gender: doctor.gender ?? "",
    specialty: doctor.specialty ?? "",
    yearOfExperience: doctor.yearOfExperience ?? "",
    password: "",
  };
}

export function getDoctorValidationSchema({ passwordRequired = true } = {}) {
  const password = Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(8, "Password must be at least 8 characters");

  return Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(25, "Doctor must be at least 25 years old")
      .max(80, "Doctor's age must be less than or equal to 80")
      .required("Age is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone must be between 10 and 15 digits")
      .required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    specialty: Yup.string().required("Specialty is required"),
    yearOfExperience: Yup.number()
      .typeError("Year of experience must be a number")
      .min(0, "Year of experience must be 0 or greater")
      .required("Year of experience is required"),
    password: passwordRequired
      ? password.required("Password is required")
      : password.optional(),
  });
}

export function toDoctorPayload(values) {
  const payload = {
    name: values.name.trim(),
    age: Number(values.age),
    email: values.email.trim(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    specialty: values.specialty,
    yearOfExperience: Number(values.yearOfExperience),
    gender: values.gender,
  };

  if (values.password) payload.password = values.password;

  return payload;
}
