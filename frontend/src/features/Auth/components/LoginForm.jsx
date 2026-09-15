import { Link } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">Login</h2>
      <p className="mt-2 text-sm text-slate-500">Sign in to your hospital account.</p>
      <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label className="block text-sm text-slate-600">
          Email
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
          />
        </label>
        <label className="block text-sm text-slate-600">
          Password
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none "
          />
        </label>
        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-[#1d2a4a] text-sm font-medium text-white"
        >
          Sign in
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
