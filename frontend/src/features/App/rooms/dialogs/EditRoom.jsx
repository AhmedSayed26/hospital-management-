import { useMemo } from "react";
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
import { useFormik } from "formik";
import RoomService from "@/services/Rooms";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import {
  getRoomValidationSchema,
  roomToFormValues,
  toRoomPayload,
} from "../roomsForm";

export default function EditRoom({ room, open, onOpenChange, onSaved }) {
  const initialValues = useMemo(() => roomToFormValues(room), [room]);
  const fieldIdPrefix = `edit-room-${room?.id ?? "new"}`;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: getRoomValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!room?.id) return;

      try {
        await RoomService.UpdateRoom(room.id, toRoomPayload(values));

        toast.add({
          type: "success",
          title: "Room updated",
          description: "The room was saved successfully",
        });

        resetForm();
        onOpenChange?.(false);
        onSaved?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to update room"),
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Edit room</DialogTitle>
            <DialogDescription>Update room number and bed capacity</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 px-1 py-1">
            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-number`} className="text-sm font-medium">
                Room number
              </label>
              <Input
                id={`${fieldIdPrefix}-number`}
                name="roomNumber"
                placeholder="Room number"
                value={formik.values.roomNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.roomNumber && formik.errors.roomNumber && (
                <p className="text-sm text-red-500">{formik.errors.roomNumber}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor={`${fieldIdPrefix}-beds`} className="text-sm font-medium">
                Total beds
              </label>
              <Input
                id={`${fieldIdPrefix}-beds`}
                name="totalBeds"
                type="number"
                min="1"
                placeholder="Total beds"
                value={formik.values.totalBeds}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalBeds && formik.errors.totalBeds && (
                <p className="text-sm text-red-500">{formik.errors.totalBeds}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={formik.isSubmitting || !room?.id}>
              {formik.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
