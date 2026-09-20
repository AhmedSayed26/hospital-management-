import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientInfoRow from "./PatientInfoRow";
import { formatShortDate } from "@/shared/utils";

export default function PatientDatesCard({ patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PatientInfoRow
          label="Registered"
          value={formatShortDate(patient?.dateOfRegistration)}
        />
        <PatientInfoRow label="Admit" value={formatShortDate(patient?.admitDate)} />
        <PatientInfoRow
          label="Room end"
          value={formatShortDate(patient?.roomEndDate)}
        />
      </CardContent>
    </Card>
  );
}
