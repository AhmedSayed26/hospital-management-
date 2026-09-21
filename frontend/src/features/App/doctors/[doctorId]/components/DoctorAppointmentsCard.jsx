import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import {
  formatAppointmentWhen,
  getInitials,
  sentenceCase,
} from "@/shared/utils";

export default function DoctorAppointmentsCard({ appointments }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {!appointments?.length ? (
          <Empty className="min-h-[220px]">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Calendar />
              </EmptyMedia>
              <EmptyTitle>No appointments</EmptyTitle>
              <EmptyDescription>
                This doctor does not have any appointments yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-4">Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead className="px-4">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="px-4 whitespace-normal">
                    <p className="font-medium">
                      {formatAppointmentWhen(appointment.date)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm" className="bg-primary/15 text-primary">
                        <AvatarFallback className="bg-primary/15 text-[11px] font-semibold text-primary">
                          {getInitials(appointment.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {appointment.patientName || "Patient"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {sentenceCase(appointment.disease)}
                  </TableCell>
                  <TableCell className="px-4 whitespace-normal">
                    {appointment.reason || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
