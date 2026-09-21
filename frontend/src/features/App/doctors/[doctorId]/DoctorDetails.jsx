import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "@/services/Doctor";
import { toast } from "@/components/ui/toast";
import { getAppointments, getErrorMessage } from "@/shared/utils";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { UserRoundX } from "lucide-react";
import EditDoctor from "../dailogs/EditDoctor";
import DeleteDoctor from "../dailogs/DeleteDoctors";
import DoctorDetailsHeader from "./components/DoctorDetailsHeader";
import DoctorStats from "./components/DoctorStats";
import DoctorContactCard from "./components/DoctorContactCard";
import DoctorPracticeCard from "./components/DoctorPracticeCard";
import DoctorAppointmentsCard from "./components/DoctorAppointmentsCard";
import DoctorDetailsSkeleton from "./components/DoctorDetailsSkeleton";

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogMode, setDialogMode] = useState(null);

  const loadDoctor = useCallback(
    async (showLoading = false) => {
      if (!doctorId) return;
      if (showLoading) setLoading(true);

      try {
        const response = await DoctorService.GetDoctorById(doctorId);
        setDoctor(response?.id != null ? response : response?.data ?? null);
      } catch (error) {
        setDoctor(null);
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load doctor"),
        });
      } finally {
        setLoading(false);
      }
    },
    [doctorId]
  );

  useEffect(() => {
    loadDoctor(true);
  }, [loadDoctor]);

  const closeDialog = () => setDialogMode(null);
  const appointments = getAppointments(doctor);

  if (loading) return <DoctorDetailsSkeleton />;

  if (!doctor) {
    return (
      <Empty className="min-h-[360px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserRoundX />
          </EmptyMedia>
          <EmptyTitle>Doctor not found</EmptyTitle>
          <EmptyDescription>
            This doctor may have been removed or the link is invalid.
          </EmptyDescription>
          <Button variant="outline" onClick={() => navigate("/app/doctors")}>
            Back to doctors
          </Button>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <DoctorDetailsHeader
        doctor={doctor}
        onEdit={() => setDialogMode("edit")}
        onDelete={() => setDialogMode("delete")}
      />

      <DoctorStats doctor={doctor} appointmentCount={appointments.length} />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
        <div className="space-y-4">
          <DoctorContactCard doctor={doctor} />
          <DoctorPracticeCard doctor={doctor} />
        </div>
        <DoctorAppointmentsCard appointments={appointments} />
      </div>

      <EditDoctor
        doctor={doctor}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={() => loadDoctor()}
      />

      <DeleteDoctor
        doctor={doctor}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={() => navigate("/app/doctors")}
      />
    </div>
  );
}
