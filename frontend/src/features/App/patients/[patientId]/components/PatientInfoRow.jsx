export default function PatientInfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 py-2 first:pt-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="max-w-[70%] text-right text-sm font-medium text-foreground">
        {value || "—"}
      </span>
    </div>
  );
}
