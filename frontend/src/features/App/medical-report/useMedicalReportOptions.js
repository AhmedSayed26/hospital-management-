import { useEffect, useState } from "react";
import PatientServices from "@/services/Patient";
import DoctorService from "@/services/Doctor";
import MedicalRecordService from "@/services/MedicalRecord";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";

export function useMedicalReportOptions({ open }) {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return undefined;

        let cancelled = false;

        const loadOptions = async () => {
            setLoading(true);

            try {
                const [patientsResponse, doctorsResponse, recordsResponse] = await Promise.all([
                    PatientServices.GetAllPatients(),
                    DoctorService.GetAllDoctors(),
                    MedicalRecordService.GetAllMedicalRecords(),
                ]);

                if (!cancelled) {
                    setPatients(toList(patientsResponse));
                    setDoctors(toList(doctorsResponse));
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
    }, [open]);

    return { patients, doctors, medicalRecords, loading };
}
