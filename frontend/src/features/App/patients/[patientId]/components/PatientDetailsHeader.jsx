import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { getInitials, isAdmitted } from "@/shared/utils";

export default function PatientDetailsHeader({ patient, stay, onEdit, onDelete }) {
  const admitted = isAdmitted(patient);
  const meta = [
    patient?.id != null ? `#${patient.id}` : null,
    patient?.gender ? String(patient.gender).replaceAll("_", " ") : null,
    patient?.disease ? String(patient.disease).replaceAll("_", " ") : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-primary px-5 py-4 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar
          size="lg"
          className="size-14 bg-white/15 text-primary-foreground after:border-white/20"
        >
          <AvatarFallback className="bg-transparent text-lg font-semibold text-primary-foreground">
            {getInitials(patient?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold">
            {patient?.name || "Unnamed patient"}
          </h1>
          <p className="truncate text-sm text-primary-foreground/75">{meta}</p>
        </div>
      </div>

      <div className="min-w-0 flex-1 sm:mx-8 sm:max-w-sm">
        {admitted && stay ? (
          <Progress
            value={stay.percent}
            className="flex-col items-stretch gap-1.5 [&_[data-slot=progress-indicator]]:bg-white [&_[data-slot=progress-track]]:bg-white/25"
          >
            <ProgressLabel className="text-xs font-medium text-primary-foreground/80">
              Admitted · Day {stay.currentDay} of {stay.totalDays}
            </ProgressLabel>
          </Progress>
        ) : (
          <p className="text-sm font-medium text-primary-foreground/80">
            {admitted ? "Admitted" : "Not admitted"}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="border-transparent bg-white text-foreground hover:bg-white/90"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-transparent bg-white text-destructive hover:bg-white/90 hover:text-destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </section>
  );
}
