import { useCallback, useEffect, useState } from "react";
import MedicalRecordService from "@/services/MedicalRecord";
import TableContent from "./components/TableContent";
import AddMedicalRecord from "./dialogs/AddMedicalRecord";
import EditMedicalRecord from "./dialogs/EditMedicalRecord";
import DeleteMedicalRecord from "./dialogs/DeleteMedicalRecord";
import ViewMedicalRecord from "./dialogs/ViewMedicalRecord";
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

export default function MedicalRecord() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getMedicalRecords = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);

      try {
        let response;

        if (user?.role === "ADMIN" && user?.id != null) {
          response = await MedicalRecordService.GetMedicalRecordsByDoctorId(
            user.id
          );
        } else if (user?.id != null) {
          response = await MedicalRecordService.GetMedicalRecordsByPatientId(
            user.id
          );
        } else {
          response = [];
        }

        setMedicalRecords(toList(response));
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load medical records"),
        });
      } finally {
        setLoading(false);
      }
    },
    [user?.id, user?.role]
  );

  useEffect(() => {
    getMedicalRecords(true);
  }, [getMedicalRecords]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (record, mode) => {
    setSelected(record);
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

  if (medicalRecords.length === 0) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No medical records found</EmptyTitle>
          <EmptyDescription>
            You don't have any medical records yet
          </EmptyDescription>
          {isAdmin && (
            <EmptyDescription>
              <AddMedicalRecord onCreated={getMedicalRecords} />
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
          <h1 className="text-xl font-medium">Medical Records</h1>
          <p className="text-sm text-muted-foreground">
            Access medical history and clinical records
          </p>
        </div>
        {isAdmin && <AddMedicalRecord onCreated={getMedicalRecords} />}
      </div>

      <TableContent
        medicalRecords={medicalRecords}
        loading={loading}
        onAction={openDialog}
        canManage={isAdmin}
      />

      <ViewMedicalRecord
        record={selected}
        open={dialogMode === "view"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <EditMedicalRecord
        record={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getMedicalRecords}
      />

      <DeleteMedicalRecord
        record={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getMedicalRecords}
      />
    </div>
  );
}
