import { useCallback, useEffect, useState } from "react";
import AddPatient from "./dialogs/AddPatinet";
import EditPatient from "./dialogs/EditPatient";
import DeletePatient from "./dialogs/DeletePatient";
import TableContent from "./components/TableContent";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getPatients = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const response = await PatientServices.GetAllPatients();
      setPatients(toList(response));
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to load patients"),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPatients(true);
  }, [getPatients]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (patient, mode) => {
    setSelected(patient);
    setDialogMode(mode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Patients</h1>
          <p className="text-sm text-muted-foreground">Manage your patients</p>
        </div>
        <AddPatient onCreated={getPatients} />
      </div>

      <TableContent
        patients={patients}
        loading={loading}
        onAction={openDialog}
      />

      <EditPatient
        patient={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getPatients}
      />

      <DeletePatient
        patient={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getPatients}
      />
    </div>
  );
}
