import { Card, CardContent } from "@/components/ui/card";

function StatCard({ label, value }) {
  return (
    <Card className="gap-0 py-4">
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">{value ?? "—"}</p>
      </CardContent>
    </Card>
  );
}

export default function DoctorStats({ doctor, appointmentCount }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
      <StatCard label="Age" value={doctor?.age ?? "—"} />
      <StatCard
        label="Experience"
        value={doctor?.yearOfExperience != null ? doctor.yearOfExperience : "—"}
      />
      <StatCard label="Appointments" value={appointmentCount} />
    </div>
  );
}
