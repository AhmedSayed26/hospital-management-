import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DataPicker } from "@/components/ui/dataPicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppointmentServices from "@/services/Appointment";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useAppointmentOptions } from "../useAppointmentOptions";
import {
  combineDateAndTime,
  getErrorMessage,
  getRequiredSpecialty,
  getVisibleDoctors,
  statusOptions,
  toSelectOptions,
} from "@/shared/utils";

const validationSchema = Yup.object({
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.string().required("Time is required"),
  reason: Yup.string()
    .min(3, "Reason must be at least 3 characters")
    .required("Reason is required"),
  status: Yup.string().required("Status is required"),
  patientId: Yup.number()
    .typeError("Patient is required")
    .required("Patient is required"),
  doctorId: Yup.number()
    .typeError("Doctor is required")
    .required("Doctor is required"),
});

export default function AddAppointments({ onCreated }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isPatient = user?.role === "USER";
  const isDoctor = user?.role === "ADMIN";

  const { doctors, patients, loading } = useAppointmentOptions({
    open,
    isDoctor,
    isPatient,
    userId: user?.id,
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: null,
      time: "09:00",
      reason: "",
      status: "PENDING",
      patientId: isPatient && user?.id != null ? String(user.id) : "",
      doctorId: isDoctor && user?.id != null ? String(user.id) : "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const appointmentDate = combineDateAndTime(values.date, values.time);

      if (appointmentDate <= new Date()) {
        toast.add({
          type: "error",
          title: "Invalid date",
          description: "Appointment date must be in the future",
        });
        setSubmitting(false);
        return;
      }

      try {
        await AppointmentServices.PostAppointment({
          date: appointmentDate.toISOString(),
          reason: values.reason.trim(),
          status: values.status,
          patientId: Number(values.patientId),
          doctorId: Number(values.doctorId),
        });

        toast.add({
          type: "success",
          title: "Appointment created",
          description: "The appointment was added successfully",
        });

        resetForm();
        setOpen(false);
        onCreated?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to create appointment"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const selectedPatient = patients.find(
    (patient) => String(patient.id) === String(formik.values.patientId)
  );
  const requiredSpecialty = getRequiredSpecialty(selectedPatient);
  const visibleDoctors = getVisibleDoctors(doctors, requiredSpecialty);
  const noDoctorAvailable = Boolean(requiredSpecialty) && visibleDoctors.length === 0;
  const doctorOptions = toSelectOptions(visibleDoctors, "specialty");
  const patientOptions = toSelectOptions(patients, "disease");

  const handlePatientChange = (value) => {
    formik.setFieldValue("patientId", value ?? "");
    formik.setFieldValue("doctorId", "");
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) formik.resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" type="button" />}>
        Add Appointment
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add Appointment</DialogTitle>
            <DialogDescription>
              Add a new appointment to the system
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="create-date" className="text-sm font-medium">
                Date
              </label>
              <DataPicker
                id="create-date"
                name="date"
                placeholder="Pick a date"
                date={formik.values.date}
                onDateChange={(date) => {
                  formik.setFieldValue("date", date ?? null);
                  formik.setFieldTouched("date", true, false);
                }}
              />
              {formik.touched.date && formik.errors.date && (
                <p className="text-sm text-red-500">{formik.errors.date}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="create-time" className="text-sm font-medium">
                Time
              </label>
              <Input
                id="create-time"
                name="time"
                type="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.time && formik.errors.time && (
                <p className="text-sm text-red-500">{formik.errors.time}</p>
              )}
            </div>
          </div>

          {!isPatient && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Patient</label>
              <Select
                items={patientOptions}
                value={formik.values.patientId || null}
                onValueChange={handlePatientChange}
                disabled={loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={loading ? "Loading..." : "Select a patient"} />
                </SelectTrigger>
                <SelectContent>
                  {patientOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.patientId && formik.errors.patientId && (
                <p className="text-sm text-red-500">{formik.errors.patientId}</p>
              )}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Doctor</label>
            {noDoctorAvailable ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                No doctor is currently available for this patient's condition.
              </p>
            ) : (
              <>
                <Select
                  items={doctorOptions}
                  value={formik.values.doctorId || null}
                  onValueChange={(value) =>
                    formik.setFieldValue("doctorId", value ?? "")
                  }
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={loading ? "Loading..." : "Select a doctor"} />
                  </SelectTrigger>
                  <SelectContent>
                    {doctorOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.doctorId && formik.errors.doctorId && (
                  <p className="text-sm text-red-500">{formik.errors.doctorId}</p>
                )}
              </>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Status</label>
            <Select
              items={statusOptions}
              value={formik.values.status}
              onValueChange={(value) => formik.setFieldValue("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-sm text-red-500">{formik.errors.status}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="create-reason" className="text-sm font-medium">
              Reason
            </label>
            <textarea
              id="create-reason"
              name="reason"
              rows={3}
              placeholder="Why is this appointment needed?"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="min-h-20 w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            {formik.touched.reason && formik.errors.reason && (
              <p className="text-sm text-red-500">{formik.errors.reason}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={formik.isSubmitting || loading || noDoctorAvailable}
            >
              {formik.isSubmitting ? "Saving..." : "Add Appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
