import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ appointments, onAction }) {
  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
