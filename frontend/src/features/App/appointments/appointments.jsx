import { useState, useEffect, useCallback } from "react";
import { Calendar } from "lucide-react";
import AppointmentServices from "@/services/Appointment";
import { toast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import AddAppointments from "./dailogs/AddAppointments";
import EditAppointment from "./dailogs/EditAppointment";
import ViewAppointment from "./dailogs/ViewAppointment";
import DeleteAppointment from "./dailogs/DeleteAppointment";
import AppointmentList from "./components/AppointmentList";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { getErrorMessage, toList } from "@/shared/utils";

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getAppointments = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      let response;

      if (user?.role === "ADMIN") {
        response = await AppointmentServices.GetAllAppointments();
      } else if (user?.id != null) {
        response = await AppointmentServices.GetAppointmentsByPatientId(user.id);
      } else {
        response = [];
      }

      setAppointments(toList(response));
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to load appointments"),
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    getAppointments(true);
  }, [getAppointments]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (appointment, mode) => {
    setSelected(appointment);
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

  if (appointments.length === 0) {
    return (
      <Empty className="border min-h-[320px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Calendar />
          </EmptyMedia>
          <EmptyTitle>No appointments found</EmptyTitle>
          <EmptyDescription>
            You don't have any appointments yet
          </EmptyDescription>
          <EmptyDescription>
            <AddAppointments onCreated={getAppointments} />
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
            <h1 className="text-xl font-medium">Appointments</h1>
            <p className="text-sm text-muted-foreground"> Appointments you have booked</p>
        </div>
        <AddAppointments onCreated={getAppointments} />
      </div>

      <AppointmentList appointments={appointments} onAction={openDialog} />

      <ViewAppointment
        appointment={selected}
        open={dialogMode === "view"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <EditAppointment
        appointment={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getAppointments}
      />

      <DeleteAppointment
        appointment={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getAppointments}
      />
    </div>
  );
}
