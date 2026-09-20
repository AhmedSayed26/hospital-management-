import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, getAdmissionStay, getAppointments } from "@/shared/utils";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { UserRoundX } from "lucide-react";
import EditPatient from "../dialogs/EditPatient";
import DeletePatient from "../dialogs/DeletePatient";
import PatientDetailsHeader from "./components/PatientDetailsHeader";
import PatientStats from "./components/PatientStats";
import PatientContactCard from "./components/PatientContactCard";
import PatientDatesCard from "./components/PatientDatesCard";
import PatientAppointmentsCard from "./components/PatientAppointmentsCard";
import PatientDetailsSkeleton from "./components/PatientDetailsSkeleton";

export default function PatiendDetails() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogMode, setDialogMode] = useState(null);

  const loadPatient = useCallback(async (showLoading = false) => {
    if (!patientId) return;
    if (showLoading) setLoading(true);

    try {
      const response = await PatientServices.GetPatientById(patientId);
      setPatient(response?.id != null ? response : response?.data ?? null);
    } catch (error) {
      setPatient(null);
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to load patient"),
      });
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    loadPatient(true);
  }, [loadPatient]);

  const closeDialog = () => setDialogMode(null);
  const appointments = getAppointments(patient);
  const stay = getAdmissionStay(patient);

  if (loading) return <PatientDetailsSkeleton />;

  if (!patient) {
    return (
      <Empty className="min-h-[360px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserRoundX />
          </EmptyMedia>
          <EmptyTitle>Patient not found</EmptyTitle>
          <EmptyDescription>
            This patient may have been removed or the link is invalid.
          </EmptyDescription>
          <Button variant="outline" onClick={() => navigate("/app/patients")}>
            Back to patients
          </Button>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <PatientDetailsHeader
        patient={patient}
        stay={stay}
        onEdit={() => setDialogMode("edit")}
        onDelete={() => setDialogMode("delete")}
      />

      <PatientStats
        patient={patient}
        stay={stay}
        appointmentCount={appointments.length}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
        <div className="space-y-4">
          <PatientContactCard patient={patient} />
          <PatientDatesCard patient={patient} />
        </div>
        <PatientAppointmentsCard appointments={appointments} />
      </div>

      <EditPatient
        patient={patient}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={() => loadPatient()}
      />

      <DeletePatient
        patient={patient}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={() => navigate("/app/patients")}
      />
    </div>
  );
}
