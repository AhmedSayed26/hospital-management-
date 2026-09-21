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
import { useFormik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import DoctorService from "@/services/Doctor";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import {
  emptyDoctorValues,
  genderOptions,
  getDoctorValidationSchema,
  specialtyOptions,
  toDoctorPayload,
} from "../doctorForm";

export default function AddDoctors({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: emptyDoctorValues,
    validationSchema: getDoctorValidationSchema({ passwordRequired: true }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await DoctorService.CreateDoctor(toDoctorPayload(values));

        toast.add({
          type: "success",
          title: "Doctor created",
          description: "The doctor was added successfully",
        });

        resetForm();
        setOpen(false);
        onCreated?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to create doctor"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      formik.resetForm();
      setShowPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" type="button" />}>
        Add Doctor
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add Doctor</DialogTitle>
            <DialogDescription>Add a new doctor to the system</DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-3 overflow-y-auto px-1 py-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="add-doctor-name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="add-doctor-name"
                  name="name"
                  placeholder="Doctor name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="add-doctor-age" className="text-sm font-medium">
                  Age
                </label>
                <Input
                  id="add-doctor-age"
                  name="age"
                  type="number"
                  min="25"
                  max="80"
                  placeholder="Age (25-80)"
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
                <label htmlFor="add-doctor-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="add-doctor-email"
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
                <label htmlFor="add-doctor-phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="add-doctor-phone"
                  name="phone"
                  placeholder="10-15 digit phone number"
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
              <label htmlFor="add-doctor-address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="add-doctor-address"
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
                <label className="text-sm font-medium">Specialty</label>
                <Select
                  items={specialtyOptions}
                  value={formik.values.specialty || null}
                  onValueChange={(value) =>
                    formik.setFieldValue("specialty", value ?? "")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.specialty && formik.errors.specialty && (
                  <p className="text-sm text-red-500">{formik.errors.specialty}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="add-doctor-experience" className="text-sm font-medium">
                Years of experience
              </label>
              <Input
                id="add-doctor-experience"
                name="yearOfExperience"
                type="number"
                min="0"
                placeholder="Years of experience"
                value={formik.values.yearOfExperience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.yearOfExperience && formik.errors.yearOfExperience && (
                <p className="text-sm text-red-500">{formik.errors.yearOfExperience}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="add-doctor-password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="add-doctor-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="pr-9"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword((current) => !current)}
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
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Add Doctor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
