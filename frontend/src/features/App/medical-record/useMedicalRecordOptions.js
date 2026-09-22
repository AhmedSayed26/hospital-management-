import { useEffect, useState } from "react";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";

export function useMedicalRecordOptions({ open }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;

    const loadOptions = async () => {
      setLoading(true);

      try {
        const patientsResponse = await PatientServices.GetAllPatients();
        if (!cancelled) setPatients(toList(patientsResponse));
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load patients"),
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [open]);

  return { patients, loading };
}
