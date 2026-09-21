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
import { useFormik } from "formik";
import RoomService from "@/services/Rooms";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import {
  emptyRoomValues,
  getRoomValidationSchema,
  toRoomPayload,
} from "../roomsForm";

export default function AddRoom({ onCreated }) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: emptyRoomValues,
    validationSchema: getRoomValidationSchema(),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await RoomService.CreateRoom(toRoomPayload(values));

        toast.add({
          type: "success",
          title: "Room created",
          description: "The room was added successfully",
        });

        resetForm();
        setOpen(false);
        onCreated?.();
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to create room"),
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" type="button" />}>
        Add Room
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={formik.handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add Room</DialogTitle>
            <DialogDescription>Add a new room to the system</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 px-1 py-2">
            <div className="space-y-2">
                <div>
                    <label htmlFor="add-room-number" className="text-sm font-medium">
                        Room number
                    </label>
                    <Input
                        id="add-room-number"
                        name="roomNumber"
                        placeholder="Room number"
                        value={formik.values.roomNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
              {formik.touched.roomNumber && formik.errors.roomNumber && (
                <p className="text-sm text-red-500">{formik.errors.roomNumber}</p>
              )}
            </div>

            <div className="space-y-2">
                <div>
                    <label htmlFor="add-room-beds" className="text-sm font-medium">
                        Total beds
                    </label>
                    <Input
                        id="add-room-beds"
                        name="totalBeds"
                        type="number"
                        min="1"
                        placeholder="Total beds"
                        value={formik.values.totalBeds}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
              {formik.touched.totalBeds && formik.errors.totalBeds && (
                <p className="text-sm text-red-500">{formik.errors.totalBeds}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Saving..." : "Add Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
