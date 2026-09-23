import { useCallback, useEffect, useState } from "react";
import MedicalReportService from "@/services/MedicalReport";
import TableContent from "./components/TableContent";
import AddReport from "./dialogs/AddReport";
import EditReport from "./dialogs/EditReport";
import DeleteReport from "./dialogs/DeleteReport";
import ViewReport from "./dialogs/ViewReport";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText } from "lucide-react";

export default function MedicalReport() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getReports = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);

      try {
        let response;

        if (user?.role === "ADMIN" && user?.id != null) {
          response = await MedicalReportService.GetMedicalReportsByDoctorId(user.id);
        } else if (user?.id != null) {
          response = await MedicalReportService.GetMedicalReportsByPatientId(user.id);
        } else {
          response = [];
        }

        setMedicalReports(toList(response));
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load medical reports"),
        });
      } finally {
        setLoading(false);
      }
    },
    [user?.id, user?.role]
  );

  useEffect(() => {
    getReports(true);
  }, [getReports]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (report, mode) => {
    setSelected(report);
    setDialogMode(mode);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (medicalReports.length === 0) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No medical reports found</EmptyTitle>
          <EmptyDescription>
            You don't have any medical reports yet
          </EmptyDescription>
          {isAdmin && (
            <EmptyDescription>
              <AddReport onCreated={getReports} />
            </EmptyDescription>
          )}
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Medical Reports</h1>
          <p className="text-sm text-muted-foreground">
            Review medical reports and diagnostic summaries
          </p>
        </div>
        {isAdmin && <AddReport onCreated={getReports} />}
      </div>

      <TableContent
        medicalReports={medicalReports}
        loading={loading}
        onAction={openDialog}
        canManage={isAdmin}
      />

      <ViewReport
        report={selected}
        open={dialogMode === "view"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <EditReport
        report={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getReports}
      />

      <DeleteReport
        report={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getReports}
      />
    </div>
  );
}
