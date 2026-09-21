import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DoctorInfoRow from "./DoctorInfoRow";
import { sentenceCase } from "@/shared/utils";

export default function DoctorContactCard({ doctor }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DoctorInfoRow label="Gender" value={sentenceCase(doctor?.gender)} />
        <DoctorInfoRow
          label="Age"
          value={doctor?.age != null ? `${doctor.age} years` : "—"}
        />
        <DoctorInfoRow label="Phone" value={doctor?.phone} />
        <DoctorInfoRow label="Email" value={doctor?.email} />
        <DoctorInfoRow label="Address" value={doctor?.address} />
      </CardContent>
    </Card>
  );
}
