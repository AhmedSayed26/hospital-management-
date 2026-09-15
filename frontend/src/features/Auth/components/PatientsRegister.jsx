import { Link } from "react-router-dom"

export default function PatientsRegister() {
  return (
    <div>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">
        Patient register
      </h2>
      <p className="mt-2 text-sm text-slate-500">Create an account to book hospital visits.</p>
      <p className="mt-8 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#24345c] underline-offset-4 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
