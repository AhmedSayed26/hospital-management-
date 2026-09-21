import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RoomService from "@/services/Rooms";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import { getRoomLabel, isRoomDeletable } from "../roomsForm";

export default function DeleteRoom({ room, open, onOpenChange, onDone }) {
  const [deleting, setDeleting] = useState(false);
  const deletable = isRoomDeletable(room);

  const handleDelete = async () => {
    if (!room?.id || !deletable) return;

    setDeleting(true);

    try {
      await RoomService.DeleteRoom(room.id);
      toast.add({
        type: "success",
        title: "Room deleted",
        description: "The room was removed successfully",
      });
      onOpenChange?.(false);
      onDone?.();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: getErrorMessage(error, "Failed to delete room"),
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete room</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The room will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        {room && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm">
            <p className="font-medium">{getRoomLabel(room)}</p>
            <p className="text-muted-foreground">ID #{room.id}</p>
            {!deletable && (
              <p className="mt-2 text-amber-600">
                This room still has occupied beds. Discharge all patients before deleting.
              </p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting || !room?.id || !deletable}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
