import * as Yup from "yup";

export const emptyRoomValues = {
  roomNumber: "",
  totalBeds: "",
};

export const emptyAssignValues = {
  patientId: "",
  stayDurationInDays: "",
};

export const emptyRemoveValues = {
  patientId: "",
};

export function getRoomValidationSchema() {
  return Yup.object({
    roomNumber: Yup.string().trim().required("Room number is required"),
    totalBeds: Yup.number()
      .typeError("Total beds must be a number")
      .required("Total beds is required")
      .min(1, "Total beds must be at least 1")
      .integer("Total beds must be a whole number"),
  });
}

export function getAssignValidationSchema() {
  return Yup.object({
    patientId: Yup.string().required("Patient is required"),
    stayDurationInDays: Yup.number()
      .typeError("Stay duration must be a number")
      .required("Stay duration is required")
      .min(1, "Stay must be at least 1 day")
      .integer("Stay must be a whole number"),
  });
}

export function getRemoveValidationSchema() {
  return Yup.object({
    patientId: Yup.string().required("Patient is required"),
  });
}

export function roomToFormValues(room) {
  if (!room) return { ...emptyRoomValues };

  return {
    roomNumber: room.roomNumber ?? "",
    totalBeds: room.totalBeds ?? "",
  };
}

export function toRoomPayload(values) {
  return {
    roomNumber: values.roomNumber.trim(),
    totalBeds: Number(values.totalBeds),
  };
}

export function getRoomOccupiedCount(room) {
  const total = Number(room?.totalBeds ?? 0);
  const available = Number(room?.availableBeds ?? 0);
  return Math.max(0, total - available);
}

export function getRoomAvailabilityPercent(room) {
  const total = Number(room?.totalBeds ?? 0);
  if (total <= 0) return 0;
  const available = Number(room?.availableBeds ?? 0);
  return Math.round((available / total) * 100);
}

export function getRoomStatus(room) {
  const total = Number(room?.totalBeds ?? 0);
  const available = Number(room?.availableBeds ?? 0);

  if (total <= 0 || available <= 0) return "full";
  if (available === total) return "available";
  return "occupied";
}

export function getRoomStatusLabel(status) {
  switch (status) {
    case "available":
      return "Available";
    case "occupied":
      return "Occupied";
    case "full":
    default:
      return "Full";
  }
}

export function getRoomsSummary(rooms) {
  const list = Array.isArray(rooms) ? rooms : [];
  const totalRooms = list.length;
  const totalBeds = list.reduce((sum, room) => sum + Number(room.totalBeds ?? 0), 0);
  const emptyBeds = list.reduce(
    (sum, room) => sum + Number(room.availableBeds ?? 0),
    0
  );
  const availabilityPercent =
    totalBeds > 0 ? Math.round((emptyBeds / totalBeds) * 100) : 0;

  return {
    totalRooms,
    totalBeds,
    emptyBeds,
    availabilityPercent,
  };
}

export function isRoomDeletable(room) {
  return getRoomOccupiedCount(room) === 0;
}

export function canAssignToRoom(room) {
  return Number(room?.availableBeds ?? 0) > 0;
}

export function getRoomLabel(room) {
  if (room?.roomNumber) return `Room ${room.roomNumber}`;
  return "Unnumbered room";
}
