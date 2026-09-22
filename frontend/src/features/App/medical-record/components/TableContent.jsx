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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Card } from "@/components/ui/card";
import { Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { doctorLabel, getInitials } from "@/shared/utils";
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
  medicalRecords,
  loading,
  onAction,
  canManage = false,
}) {
  if (loading) return <TableSkeleton />;

  if (!medicalRecords?.length) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No medical records found</EmptyTitle>
          <EmptyDescription>
            Medical records you add will show up here.
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
            <TableHead>Date</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Treatment</TableHead>
            <TableHead className="px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="sm" className="bg-primary/10 text-primary">
                    <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                      {getInitials(record.patientName)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="truncate font-medium text-foreground">
                    {record.patientName || "Unnamed patient"}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <p className="truncate text-sm text-foreground">
                  {doctorLabel(record.doctorName)}
                </p>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatShortDate(record.visitDate)}
              </TableCell>

              <TableCell>
                <div className="max-w-[16rem]">
                  <p className="truncate text-sm text-foreground">
                    {record.diagnosis || "—"}
                  </p>
                  {record.notes ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {record.notes}
                    </p>
                  ) : null}
                </div>
              </TableCell>

              <TableCell>
                <p className="max-w-[16rem] truncate text-sm text-foreground">
                  {record.treatment || "—"}
                </p>
              </TableCell>

              <TableCell className="px-4">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                    onClick={() => onAction?.(record, "view")}
                  >
                    <Eye />
                    <span className="sr-only">View {record.patientName}</span>
                  </Button>
                  {canManage && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        className="text-muted-foreground"
                        onClick={() => onAction?.(record, "edit")}
                      >
                        <Pencil />
                        <span className="sr-only">Edit {record.patientName}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        type="button"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => onAction?.(record, "delete")}
                      >
                        <Trash2 />
                        <span className="sr-only">Delete {record.patientName}</span>
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
