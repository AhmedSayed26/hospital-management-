import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DoctorInfoRow from "./DoctorInfoRow";
import { sentenceCase } from "@/shared/utils";

export default function DoctorPracticeCard({ doctor }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Practice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DoctorInfoRow label="Specialty" value={sentenceCase(doctor?.specialty)} />
        <DoctorInfoRow
          label="Experience"
          value={
            doctor?.yearOfExperience != null
              ? `${doctor.yearOfExperience} years`
              : "—"
          }
        />
      </CardContent>
    </Card>
  );
}
