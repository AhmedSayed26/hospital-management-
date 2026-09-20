import { useEffect, useState } from "react";
import DoctorServices from "@/services/Doctor";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";

export function useAppointmentOptions({ open, isDoctor, isPatient, userId }) {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;

    const loadOptions = async () => {
      setLoading(true);

      try {
        const doctorsResponse = await DoctorServices.GetAllDoctors();
        if (!cancelled) setDoctors(toList(doctorsResponse));

        if (isDoctor) {
          const patientsResponse = await PatientServices.GetAllPatients();
          if (!cancelled) setPatients(toList(patientsResponse));
        } else if (isPatient && userId != null) {
          const patient = await PatientServices.GetPatientById(userId);
          if (!cancelled) setPatients(patient ? [patient] : []);
        }
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load form options"),
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [open, isDoctor, isPatient, userId]);

  return { doctors, patients, loading };
}
