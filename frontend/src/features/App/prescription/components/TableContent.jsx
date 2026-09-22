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
import { Eye, Pill, Pencil, Trash2 } from "lucide-react";
import { doctorLabel, getInitials, sentenceCase } from "@/shared/utils";
import { formatShortDate } from "@/shared/format";

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

export default function TableContent({
  prescriptions,
  loading,
  onAction,
  canManage = false,
}) {
  if (loading) return <TableSkeleton />;

  if (!prescriptions?.length) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Pill />
          </EmptyMedia>
          <EmptyTitle>No prescriptions found</EmptyTitle>
          <EmptyDescription>
            Prescriptions you add will show up here.
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
            <TableHead>Doctor</TableHead>
            <TableHead>Issue date</TableHead>
            <TableHead>Medicine</TableHead>
            <TableHead>Disease</TableHead>
            <TableHead className="px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell className="px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="sm" className="bg-primary/10 text-primary">
                    <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                      {getInitials(prescription.patientName)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="truncate font-medium text-foreground">
                    {prescription.patientName || "Unnamed patient"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="min-w-[10rem]">
                  <p className="truncate text-sm text-foreground">
                    {doctorLabel(prescription.doctorName)}
                  </p>
                  {prescription.doctorSpecialty ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {sentenceCase(prescription.doctorSpecialty)}
                    </p>
                  ) : null}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatShortDate(prescription.issueDate)}
              </TableCell>

              <TableCell>
                <p className="max-w-[16rem] truncate text-sm text-foreground">
                  {prescription.medicineDescription || "—"}
                </p>
              </TableCell>

              <TableCell>
                {prescription.patientDisease ? (
                  <Badge variant="secondary" className="font-normal">
                    {sentenceCase(prescription.patientDisease)}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell className="px-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => onAction?.(prescription, "view")}
                  >
                    <Eye />
                    <span className="sr-only">View {prescription.patientName}</span>
                  </Button>
                  {canManage && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        className="text-muted-foreground"
                        onClick={() => onAction?.(prescription, "edit")}
                      >
                        <Pencil />
                        <span className="sr-only">Edit {prescription.patientName}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => onAction?.(prescription, "delete")}
                      >
                        <Trash2 />
                        <span className="sr-only">Delete {prescription.patientName}</span>
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
