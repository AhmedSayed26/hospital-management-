import { Link } from "react-router-dom"

export default function DoctorResister() {
  return (
    <div>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">
        Doctor register
      </h2>
      <p className="mt-2 text-sm text-slate-500">Join the hospital team and manage your patients.</p>
      <p className="mt-8 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#24345c] underline-offset-4 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
