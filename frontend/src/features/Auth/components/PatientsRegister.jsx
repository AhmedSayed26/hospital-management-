import { useState } from "react"

import { Input } from "@/components/ui/input"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import { Link, useNavigate } from "react-router-dom"

import { DataPicker } from "@/components/ui/dataPicker"

import { EyeIcon, EyeOffIcon } from "lucide-react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/contexts/AuthContext/AuthContext"
import { toast } from "@/components/ui/toast"

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
]

// Disease options
const diseaseOptions = [
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
]

// Yup validation schema for patient registration
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  age: Yup.number()
    .typeError("Age must be a number")
    .min(0, "Age must be 0 or greater")
    .required("Age is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  address: Yup.string()
    .required("Address is required"),

  phone: Yup.string()
    .matches(/^(01)[0-9]{9}$/, "Phone must be a valid Egyptian number (01XXXXXXXXX)")
    .required("Phone is required"),

  gender: Yup.string()
    .required("Gender is required"),

  dateOfRegistration: Yup.date()
    .nullable()
    .required("Registration date is required"),

  bloodType: Yup.string()
    .required("Blood type is required"),

  disease: Yup.string()
    .required("Disease is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
})

// get backend payload
function toBackendPayload(values) {
  return {
    name: values.name,
    age: Number(values.age),
    email: values.email,
    phone: values.phone,
    password: values.password,
    address: values.address,
    disease: values.disease,
    bloodType: values.bloodType,
    gender: values.gender,
    dateOfRegistration: values.dateOfRegistration
      ? values.dateOfRegistration.toISOString().split("T")[0]
      : null,
  }
}

export default function PatientsRegister() {
  const { registerPatient } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      address: "",
      phone: "",
      gender: "",
      dateOfRegistration: null,
      bloodType: "",
      disease: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await registerPatient(toBackendPayload(values))
        toast.add({
          type: "success",
          description: "Registration successful!",
        })
        navigate("/app/dashboard")
      } catch (error) {
        setStatus({ error: error.message })
        toast.add({
          type: "error",
          description: error.message || "Registration failed",
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="mx-1">
      <h2 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">
        Patient register
      </h2>
      <p className="mt-2 text-sm text-slate-500">Create an account to book hospital visits.</p>
      <form className="space-y-4 my-4" onSubmit={formik.handleSubmit}>
        {/* name and age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <Input
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              min="0"
              required
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.age}</p>
            )}
          </div>
        </div>
        {/* email and phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <Input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="phone"
              name="phone"
              placeholder="01XXXXXXXXX"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        {/* address */}
        <div>
          <Input
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.address}</p>
          )}
        </div>
        {/* gender and date of registration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              id="gender"
              name="gender"
              items={genderOptions}
              value={formik.values.gender}
              onValueChange={(value) => formik.setFieldValue("gender", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.gender}</p>
            )}
          </div>

          <div>
            <DataPicker
              id="date-of-registration"
              name="dateOfRegistration"
              placeholder="Select date of registration"
              date={formik.values.dateOfRegistration}
              onDateChange={(date) => formik.setFieldValue("dateOfRegistration", date)}
            />
            {formik.touched.dateOfRegistration && formik.errors.dateOfRegistration && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.dateOfRegistration}</p>
            )}
          </div>
        </div>
        {/* blood type and disease */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={formik.values.bloodType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="blood-type"
              name="bloodType"
              placeholder="Enter your blood type (e.g. A+)"
            />
            {formik.touched.bloodType && formik.errors.bloodType && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.bloodType}</p>
            )}
          </div>

          <div>
            <Select
              id="disease"
              name="disease"
              items={diseaseOptions}
              value={formik.values.disease}
              onValueChange={(value) => formik.setFieldValue("disease", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a disease" />
              </SelectTrigger>
              <SelectContent>
                {diseaseOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.disease && formik.errors.disease && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.disease}</p>
            )}
          </div>
        </div>
        {/* password */}
        <div className="relative">
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          {showPassword ? (
            <EyeIcon
              className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeOffIcon
              className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
        )}


        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <p className="mt-2 text-sm text-slate-500">Create an account to book hospital visits.</p>
        <p className="mt-4 text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#24345c] underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
