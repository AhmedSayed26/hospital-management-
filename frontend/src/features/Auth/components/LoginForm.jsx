import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik"
import * as Yup from "yup"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext/AuthContext"
import { toast } from "@/components/ui/toast"

// validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

// get backend payload
function toBackendPayload(values) {
  return {
    email: values.email,
    password: values.password,
  }
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await login(toBackendPayload(values))
        navigate("/app/dashboard")
        toast.add({
          type: "success",
          description: "Login successful!",
        })
      } catch (error) {
        setStatus({ error: error.message })
        toast.add({
          type: "error",
          description: error.message || "Login failed",
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
      <div className="mx-1">
        <h2 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">Login</h2>
        <p className="mt-2 text-sm text-slate-500">Sign in to your hospital account.</p>
        <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
          <label className="block text-sm text-slate-600">
            Email
            <Input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </label>


          <div>
            <label
              htmlFor="password"
              className="block text-sm text-slate-600"
            >
              Password
            </label>

            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="pr-10"
              />

              {showPassword ? (
                <EyeIcon
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOffIcon
                  className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>


          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="h-11 w-full rounded-full bg-[#1d2a4a] text-sm font-medium text-white"
          >
            {formik.isSubmitting ? "Logging in..." : "Sign in"}
          </Button>
        </form>
        <p className="mt-6 text-sm text-slate-500">
          New here?{" "}
          <Link to="/patients" className="font-medium text-[#24345c] underline-offset-4 hover:underline">
            Register as a patient
          </Link>
          {" · "}
          <Link to="/doctors" className="font-medium text-[#24345c] underline-offset-4 hover:underline">
            Register as a doctor
          </Link>
        </p>
      </div>
  )
}
