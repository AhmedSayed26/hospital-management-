import { useEffect, useState } from "react";
import PatientServices from "@/services/Patient";
import MedicalRecordService from "@/services/MedicalRecord";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";

export function usePrescriptionOptions({ open, doctorId }) {
  const [patients, setPatients] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || doctorId == null) return undefined;

    let cancelled = false;

    const loadOptions = async () => {
      setLoading(true);

      try {
        const [patientsResponse, recordsResponse] = await Promise.all([
          PatientServices.GetAllPatients(),
          MedicalRecordService.GetMedicalRecordsByDoctorId(doctorId),
        ]);

        if (!cancelled) {
          setPatients(toList(patientsResponse));
          setMedicalRecords(toList(recordsResponse));
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
  }, [open, doctorId]);

  return { patients, medicalRecords, loading };
}
