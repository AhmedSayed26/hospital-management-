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
import { Eye, Pencil, Trash2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInitials, sentenceCase } from "@/shared/utils";

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

export default function TableContent({ doctors, loading, onAction }) {
  const navigate = useNavigate();

  if (loading) return <TableSkeleton />;

  if (!doctors?.length) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>No doctors found</EmptyTitle>
          <EmptyDescription>
            Doctors you add will show up here.
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
            <TableHead className="px-4">Doctor</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead className="px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
            {/* Patient Name and Email and Admitted Badge */}
              <TableCell className="px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="sm" className="bg-primary/10 text-primary">
                    <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                      {getInitials(doctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">
                        {doctor.name || "Unnamed doctor"}
                      </p>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {doctor.email || "No email"}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Patient Phone and Address */}
              <TableCell>
                <div className="min-w-[10rem]">
                  <p className="text-sm text-foreground">{doctor.phone || "—"}</p>
                  <p className="max-w-[14rem] truncate text-xs text-muted-foreground">
                    {doctor.address || "No address"}
                  </p>
                </div>
              </TableCell>

              {/* Patient Age, Gender and Blood Type */}
              <TableCell className="whitespace-normal">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline" className="font-normal">
                    {doctor.age != null ? `${doctor.age} yrs` : "Age —"}
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    {sentenceCase(doctor.gender)}
                  </Badge>
                  <Badge variant="secondary" className="font-medium">
                    {doctor.yearOfExperience != null
                      ? `${doctor.yearOfExperience} yrs exp`
                      : "Experience —"}
                  </Badge>
                </div>
              </TableCell>

              {/* Doctor Specialty */}
              <TableCell>
                {doctor.specialty ? (
                  <Badge
                    variant="secondary"
                  >
                    {sentenceCase(doctor.specialty)}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              {/* Doctor Actions */}
              <TableCell className="px-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => navigate(`/app/doctors/${doctor.id}`)}
                  >
                    <Eye />
                    <span className="sr-only">View {doctor.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => onAction?.(doctor, "edit")}
                  >
                    <Pencil />
                    <span className="sr-only">Edit {doctor.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => onAction?.(doctor, "delete")}
                  >
                    <Trash2 />
                    <span className="sr-only">Delete {doctor.name}</span>
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
