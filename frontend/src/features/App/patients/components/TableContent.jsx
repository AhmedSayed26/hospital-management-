import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card } from "@/components/ui/card";
import { getInitials, isAdmitted, sentenceCase } from "@/shared/utils";
import { Eye, Pencil, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TableSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="space-y-3 p-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </Card>
  );
}

export default function TableContent({ patients, loading, onAction }) {
  const navigate = useNavigate();

  if (loading) return <TableSkeleton />;

  if (!patients?.length) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>No patients found</EmptyTitle>
          <EmptyDescription>
            Patients you add will show up here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card className="gap-0 overflow-hidden px-0 py-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="px-4">Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Disease</TableHead>
            <TableHead className="px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
            {/* Patient Name and Email and Admitted Badge */}
              <TableCell className="px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="sm" className="bg-primary/10 text-primary">
                    <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">
                        {patient.name || "Unnamed patient"}
                      </p>
                      {isAdmitted(patient) && (
                        <Badge
                          variant="secondary"
                          className="h-5 border-transparent bg-emerald-100 px-1.5 text-[10px] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        >
                          Admitted
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {patient.email || "No email"}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Patient Phone and Address */}
              <TableCell>
                <div className="min-w-[10rem]">
                  <p className="text-sm text-foreground">{patient.phone || "—"}</p>
                  <p className="max-w-[14rem] truncate text-xs text-muted-foreground">
                    {patient.address || "No address"}
                  </p>
                </div>
              </TableCell>

              {/* Patient Age, Gender and Blood Type */}
              <TableCell className="whitespace-normal">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="font-normal">
                    {patient.age != null ? `${patient.age} yrs` : "Age —"}
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    {sentenceCase(patient.gender)}
                  </Badge>
                  <Badge variant="secondary" className="font-medium">
                    {patient.bloodType || "Blood —"}
                  </Badge>
                </div>
              </TableCell>

              {/* Patient Disease */}
              <TableCell>
                {patient.disease ? (
                  <Badge
                    variant="secondary"
                  >
                    {sentenceCase(patient.disease)}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              {/* Patient Actions */}
              <TableCell className="px-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => navigate(`/app/patients/${patient.id}`)}
                  >
                    <Eye />
                    <span className="sr-only">View {patient.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => onAction?.(patient, "edit")}
                  >
                    <Pencil />
                    <span className="sr-only">Edit {patient.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => onAction?.(patient, "delete")}
                  >
                    <Trash2 />
                    <span className="sr-only">Delete {patient.name}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
