import { useCallback, useEffect, useState } from "react";
import AddDoctors from "./dailogs/AddDoctors";
import EditDoctor from "./dailogs/EditDoctor";
import DeleteDoctor from "./dailogs/DeleteDoctors";
import TableContent from "./components/TableContent";
import DoctorService from "@/services/Doctor";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Doctores() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getDoctors = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const response = await DoctorService.GetAllDoctors();
      setDoctors(toList(response));
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to load doctors"),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDoctors(true);
  }, [getDoctors]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (doctor, mode) => {
    setSelected(doctor);
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
    )
  }


  if (doctors.length === 0) {
    return (
      <Empty className="border min-h-[320px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <User />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No doctors found</EmptyTitle>
        <EmptyDescription>
          You don't have any doctors yet
        </EmptyDescription>
        <EmptyDescription>
          <AddDoctors onCreated={getDoctors} />
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Doctors</h1>
          <p className="text-sm text-muted-foreground">Manage your doctors</p>
        </div>
        <AddDoctors onCreated={getDoctors} />
      </div>

      <TableContent
        doctors={doctors}
        loading={loading}
        onAction={openDialog}
      />

      <EditDoctor
        doctor={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getDoctors}
      />

      <DeleteDoctor
        doctor={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getDoctors}
      />
    </div>
  );
}
