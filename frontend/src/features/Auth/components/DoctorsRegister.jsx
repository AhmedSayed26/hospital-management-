import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { useFormik } from "formik"
import * as Yup from "yup"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext/AuthContext"
import { toast } from "@/components/ui/toast"

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
]

const specialtyOptions = [
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
]

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  age: Yup.number()
    .typeError("Age must be a number")
    .min(25, "Doctor must be at least 25 years old")
    .max(80, "Doctor's age must be less than or equal to 80")
    .required("Age is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  address: Yup.string()
    .required("Address is required"),

  phone: Yup.string()
    .matches(/^\d{10,15}$/, "Phone must be between 10 and 15 digits")
    .required("Phone is required"),

  gender: Yup.string()
    .required("Gender is required"),

  specialty: Yup.string()
    .required("Specialty is required"),

  yearOfExperience: Yup.number()
    .typeError("Year of experience must be a number")
    .min(0, "Year of experience must be 0 or greater")
    .required("Year of experience is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
})

function toBackendPayload(values) {
  return {
    name: values.name,
    age: Number(values.age),
    email: values.email,
    phone: values.phone,
    password: values.password,
    specialty: values.specialty,
    yearOfExperience: Number(values.yearOfExperience),
    gender: values.gender,
    address: values.address,
  }
}

export default function DoctorsRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const { registerDoctor } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      specialty: "",
      phone: "",
      address: "",
      yearOfExperience: "",
      gender: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await registerDoctor(toBackendPayload(values))
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
        Doctor register
      </h2>
      <p className="mt-2 text-sm text-slate-500">Create an account to join the hospital team.</p>
      <form className="space-y-4 my-4" onSubmit={formik.handleSubmit}>
        {/* name and email */}
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
        </div>
        {/* specialty and phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Select
              id="specialty"
              name="specialty"
              items={specialtyOptions}
              value={formik.values.specialty}
              onValueChange={(value) => formik.setFieldValue("specialty", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialtyOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.specialty && formik.errors.specialty && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.specialty}</p>
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
              placeholder="10-15 digit phone number"
              required
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        {/* address and year of experience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              required
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.address}</p>
            )}
          </div>

          <div>
            <Input
              value={formik.values.yearOfExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="yearOfExperience"
              name="yearOfExperience"
              placeholder="Years of experience"
              min="0"
              required
            />
            {formik.touched.yearOfExperience && formik.errors.yearOfExperience && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.yearOfExperience}</p>
            )}
          </div>
        </div>
        {/* gender and age */}
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
            <Input
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              id="age"
              name="age"
              placeholder="Age (25-80)"
              min="25"
              max="80"
              required
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.age}</p>
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
        <p className="mt-2 text-sm text-slate-500">Join the hospital team and manage your patients.</p>
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
