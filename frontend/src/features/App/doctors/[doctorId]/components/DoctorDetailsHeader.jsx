import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { doctorLabel, getInitials, sentenceCase } from "@/shared/utils";

export default function DoctorDetailsHeader({ doctor, onEdit, onDelete }) {
  const experience =
    doctor?.yearOfExperience != null
      ? `${doctor.yearOfExperience} yrs experience`
      : null;
  const meta = [
    doctor?.id != null ? `#${doctor.id}` : null,
    doctor?.gender ? sentenceCase(doctor.gender) : null,
    doctor?.specialty ? sentenceCase(doctor.specialty) : null,
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
            {getInitials(doctor?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold">
            {doctorLabel(doctor?.name)}
          </h1>
          <p className="truncate text-sm text-primary-foreground/75">{meta}</p>
        </div>
      </div>

      <div className="min-w-0 flex-1 sm:mx-8 sm:max-w-sm">
        <p className="text-sm font-medium text-primary-foreground/80">
          {experience || "Experience not set"}
        </p>
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
