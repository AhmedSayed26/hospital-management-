import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import PatientServices from "@/services/Patient";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import {
  bloodTypeOptions,
  diseaseOptions,
  genderOptions,
  getPatientValidationSchema,
  patientToFormValues,
  toPatientPayload,
} from "../patientForm";

export default function EditPatient({ patient, open, onOpenChange, onSaved }) {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = useMemo(() => patientToFormValues(patient), [patient]);
  const fieldIdPrefix = `edit-patient-${patient?.id ?? "new"}`;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: getPatientValidationSchema({ passwordRequired: false }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!patient?.id) return;

      try {
        await PatientServices.UpdatePatient(
          patient.id,
          toPatientPayload(values, { id: patient.id })
        );

        toast.add({
          type: "success",
          title: "Patient updated",
          description: "The patient was saved successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onSaved?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to update patient"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenChange = (nextOpen) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      formik.resetForm();
      setShowPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update patient details</DialogDescription>
          </DialogHeader>

          {/* Patient Details */}
          <div className="grid max-h-[60vh] gap-3 overflow-y-auto px-1 py-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor={`${fieldIdPrefix}-name`} className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id={`${fieldIdPrefix}-name`}
                  name="name"
                  placeholder="Patient name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`${fieldIdPrefix}-age`} className="text-sm font-medium">
                  Age
                </label>
                <Input
                  id={`${fieldIdPrefix}-age`}
                  name="age"
                  type="number"
                  min="0"
                  placeholder="Age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age && (
                  <p className="text-sm text-red-500">{formik.errors.age}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor={`${fieldIdPrefix}-email`} className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id={`${fieldIdPrefix}-email`}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`${fieldIdPrefix}-phone`} className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id={`${fieldIdPrefix}-phone`}
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-address`} className="text-sm font-medium">
                Address
              </label>
              <Input
                id={`${fieldIdPrefix}-address`}
                name="address"
                placeholder="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-sm text-red-500">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Gender</label>
                <Select
                  items={genderOptions}
                  value={formik.values.gender || null}
                  onValueChange={(value) => formik.setFieldValue("gender", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-sm text-red-500">{formik.errors.gender}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor={`${fieldIdPrefix}-date`} className="text-sm font-medium">
                  Registration date
                </label>
                <DataPicker
                  id={`${fieldIdPrefix}-date`}
                  name="dateOfRegistration"
                  placeholder="Pick a date"
                  date={formik.values.dateOfRegistration}
                  onDateChange={(date) => {
                    formik.setFieldValue("dateOfRegistration", date ?? null);
                    formik.setFieldTouched("dateOfRegistration", true, false);
                  }}
                />
                {formik.touched.dateOfRegistration && formik.errors.dateOfRegistration && (
                  <p className="text-sm text-red-500">{formik.errors.dateOfRegistration}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Blood type</label>
                <Select
                  items={bloodTypeOptions}
                  value={formik.values.bloodType || null}
                  onValueChange={(value) =>
                    formik.setFieldValue("bloodType", value ?? "")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypeOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.bloodType && formik.errors.bloodType && (
                  <p className="text-sm text-red-500">{formik.errors.bloodType}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Disease</label>
                <Select
                  items={diseaseOptions}
                  value={formik.values.disease || null}
                  onValueChange={(value) => formik.setFieldValue("disease", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select disease" />
                  </SelectTrigger>
                  <SelectContent>
                    {diseaseOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.disease && formik.errors.disease && (
                  <p className="text-sm text-red-500">{formik.errors.disease}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-password`} className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id={`${fieldIdPrefix}-password`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pr-9"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((open) => !open)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={formik.isSubmitting || !patient?.id}>
              {formik.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
