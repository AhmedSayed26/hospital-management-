import { useCallback, useEffect, useState } from "react";
import RoomService from "@/services/Rooms";
import { toast } from "@/components/ui/toast";
import { getErrorMessage, toList } from "@/shared/utils";
import { Bed } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import AddRoom from "./dialogs/AddRoom";
import EditRoom from "./dialogs/EditRoom";
import DeleteRoom from "./dialogs/DeleteRoom";
import AssignPatient from "./dialogs/AssignPatient";
import RemovePatient from "./dialogs/RemovePatient";
import RoomsBanner from "./components/RoomsBanner";
import RoomCard from "./components/RoomCard";

function RoomsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-40 w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState(null);

  const getRooms = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const response = await RoomService.GetAllRooms();
      setRooms(toList(response));
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error fetching rooms",
        description: getErrorMessage(error, "The rooms were not fetched successfully"),
      });
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRooms(true);
  }, [getRooms]);

  const closeDialog = () => {
    setDialogMode(null);
    setSelected(null);
  };

  const openDialog = (room, mode) => {
    setSelected(room);
    setDialogMode(mode);
  };

  if (loading) {
    return <RoomsSkeleton />;
  }

  if (rooms.length === 0) {
    return (
      <Empty className="min-h-[320px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Bed />
          </EmptyMedia>
          <EmptyTitle>No rooms found</EmptyTitle>
          <EmptyDescription>You don't have any rooms yet</EmptyDescription>
          <EmptyDescription>
            <AddRoom onCreated={getRooms} />
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-5">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Rooms</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your rooms here
                </p>
            </div>
            <div className="flex items-center gap-2">
                <AddRoom onCreated={getRooms} />
            </div>
        </div>

      <RoomsBanner rooms={rooms} />

      <div className="grid gap-4 h-full md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onAction={openDialog} />
        ))}
      </div>

      <EditRoom
        room={selected}
        open={dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        onSaved={getRooms}
      />

      <DeleteRoom
        room={selected}
        open={dialogMode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getRooms}
      />

      <AssignPatient
        room={selected}
        open={dialogMode === "assign"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getRooms}
      />

      <RemovePatient
        room={selected}
        open={dialogMode === "remove"}
        onOpenChange={(open) => !open && closeDialog()}
        onDone={getRooms}
      />
    </div>
  );
}
