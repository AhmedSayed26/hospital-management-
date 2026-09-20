import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientInfoRow from "./PatientInfoRow";
import { sentenceCase } from "@/shared/utils";

export default function PatientContactCard({ patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PatientInfoRow label="Gender" value={sentenceCase(patient?.gender)} />
        <PatientInfoRow
          label="Age"
          value={patient?.age != null ? `${patient.age} years` : "—"}
        />
        <PatientInfoRow label="Phone" value={patient?.phone} />
        <PatientInfoRow label="Email" value={patient?.email} />
        <PatientInfoRow label="Address" value={patient?.address} />
      </CardContent>
    </Card>
  );
}
