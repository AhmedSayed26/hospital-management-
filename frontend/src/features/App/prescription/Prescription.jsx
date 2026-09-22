import { useCallback, useEffect, useState } from "react";
import PrescriptionService from "@/services/Prescription";
import TableContent from "./components/TableContent";
import AddPrescription from "./dialogs/AddPrescription";
import EditPrescription from "./dialogs/EditPrescription";
import DeletePrescription from "./dialogs/DeletePrescription";
import ViewPrescription from "./dialogs/ViewPrescription";
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
import { Pill } from "lucide-react";

export default function Prescription() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getPrescriptions = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);

      try {
        let response;

        if (user?.role === "ADMIN" && user?.id != null) {
          response = await PrescriptionService.GetPrescriptionsByDoctorId(user.id);
        } else if (user?.id != null) {
          response = await PrescriptionService.GetPrescriptionsByPatientId(user.id);
        } else {
          response = [];
        }

        setPrescriptions(toList(response));
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load prescriptions"),
        });
      } finally {
        setLoading(false);
      }
    },
    [user?.id, user?.role]
  );

  useEffect(() => {
    getPrescriptions(true);
  }, [getPrescriptions]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (prescription, mode) => {
    setSelected(prescription);
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

  if (prescriptions.length === 0) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Pill />
          </EmptyMedia>
          <EmptyTitle>No prescriptions found</EmptyTitle>
          <EmptyDescription>
            You don't have any prescriptions yet
          </EmptyDescription>
          {isAdmin && (
            <EmptyDescription>
              <AddPrescription onCreated={getPrescriptions} />
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
          <h1 className="text-xl font-medium">Prescriptions</h1>
          <p className="text-sm text-muted-foreground">
            View and manage patient prescriptions
          </p>
        </div>
        {isAdmin && <AddPrescription onCreated={getPrescriptions} />}
      </div>

      <TableContent
        prescriptions={prescriptions}
        loading={loading}
        onAction={openDialog}
        canManage={isAdmin}
      />

      <ViewPrescription
        prescription={selected}
        open={dialogMode === "view"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <EditPrescription
        prescription={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getPrescriptions}
      />

      <DeletePrescription
        prescription={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getPrescriptions}
      />
    </div>
  );
}
