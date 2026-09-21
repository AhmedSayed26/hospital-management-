import {
  BedDouble,
  DoorOpen,
  LogOut,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  canAssignToRoom,
  getRoomAvailabilityPercent,
  getRoomLabel,
  getRoomOccupiedCount,
  getRoomStatus,
  getRoomStatusLabel,
  isRoomDeletable,
} from "../roomsForm";

function statusBadgeClass(status) {
  switch (status) {
    case "available":
      return "bg-primary/10 text-primary dark:bg-primary/20";
    case "occupied":
      return "bg-accent text-accent-foreground";
    case "full":
    default:
      return "bg-destructive/10 text-destructive dark:bg-destructive/20";
  }
}

function BedSlot({ index, occupied, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl border px-1 py-2 transition-colors ${
        occupied
          ? "border-border bg-muted text-muted-foreground hover:bg-muted/80"
          : "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
      }`}
      title={
        occupied
          ? `Bed ${index} occupied — click to discharge`
          : `Bed ${index} empty — click to assign`
      }
    >
      <BedDouble className="size-4" />
      <span className="text-[11px] font-medium">{index}</span>
    </button>
  );
}

export default function RoomCard({ room, onAction }) {
  const totalBeds = Number(room?.totalBeds ?? 0);
  const availableBeds = Number(room?.availableBeds ?? 0);
  const occupiedCount = getRoomOccupiedCount(room);
  const availabilityPercent = getRoomAvailabilityPercent(room);
  const status = getRoomStatus(room);
  const assignable = canAssignToRoom(room);
  const deletable = isRoomDeletable(room);

  const beds = Array.from({ length: totalBeds }, (_, index) => ({
    index: index + 1,
    occupied: index < occupiedCount,
  }));

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <DoorOpen className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-foreground">
                {getRoomLabel(room)}
              </p>
              <p className="text-sm text-muted-foreground">ID #{room.id}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Badge
              variant="secondary"
              className={`h-6 gap-1.5 border-transparent px-2.5 ${statusBadgeClass(status)}`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {getRoomStatusLabel(status)}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    className="text-muted-foreground"
                  />
                }
              >
                <MoreHorizontal />
                <span className="sr-only">Open menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onAction(room, "assign")}
                  disabled={!assignable}
                >
                  <UserPlus />
                  Assign patient
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction(room, "remove")}
                  disabled={occupiedCount === 0}
                >
                  <LogOut />
                  Discharge patient
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(room, "edit")}>
                  <Pencil />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onAction(room, "delete")}
                  disabled={!deletable}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] gap-2">
          {beds.map((bed) => (
            <BedSlot
              key={bed.index}
              index={bed.index}
              occupied={bed.occupied}
              onClick={() =>
                onAction(room, bed.occupied ? "remove" : "assign")
              }
            />
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {availableBeds} of {totalBeds} beds empty
            </span>
            <span className="font-medium text-foreground">
              {availabilityPercent}%
            </span>
          </div>
          <Progress value={availabilityPercent} className="gap-0" />
        </div>
      </div>

      <div className="border-t bg-muted/30 p-4">
        <Button
          type="button"
          className="w-full"
          disabled={!assignable}
          onClick={() => onAction(room, "assign")}
        >
          Choose bed
        </Button>
      </div>
    </Card>
  );
}
