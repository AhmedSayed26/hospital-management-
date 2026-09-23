import { useEffect, useState } from "react";
import {
  BedDouble,
  Calendar,
  ClipboardList,
  Clock,
  Users,
} from "lucide-react";
import DashboardService from "@/services/Dashboard";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/shared/utils";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import AppointmentRow from "./components/AppointmentRow";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSection from "./components/DashboardSection";
import DashboardSkeleton from "./components/DashboardSkeleton";
import EmptyLine from "./components/EmptyLine";
import QuickLinks from "./components/QuickLinks";
import ReportRow from "./components/ReportRow";
import StatCard from "./components/StatCard";

const QUICK_LINKS = [
  { label: "Appointments", href: "/app/appointments", icon: Calendar },
  { label: "Patients", href: "/app/patients", icon: Users },
  { label: "Rooms", href: "/app/rooms", icon: BedDouble },
  { label: "Reports", href: "/app/reports", icon: ClipboardList },
];

export default function DoctorsDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await DashboardService.GetDoctorDashboard();
        if (active) setDashboard(data);
      } catch (error) {
        toast.add({
          type: "error",
          title: "Error",
          description: getErrorMessage(error, "Failed to load dashboard"),
        });
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (!dashboard) {
    return (
      <DashboardHeader
        title="Dashboard"
        subtitle="Your practice overview could not be loaded."
      />
    );
  }

  const name = user?.email?.split("@")[0] ?? "Doctor";
  const todaySchedule = dashboard.todaySchedule ?? [];
  const pendingList = dashboard.pendingList ?? [];
  const reports = dashboard.recentReports ?? [];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Hello, ${name}`}
        subtitle="Today’s schedule, pending visits, and recent reports."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today’s appointments"
          value={dashboard.todayAppointments}
          href="/app/appointments"
          icon={Calendar}
        />
        <StatCard
          label="Pending"
          value={dashboard.pendingAppointments}
          href="/app/appointments"
          icon={Clock}
        />
        <StatCard
          label="My patients"
          value={dashboard.patients}
          href="/app/patients"
          icon={Users}
        />
        <StatCard
          label="Beds available"
          value={dashboard.availableBeds}
          hint={`of ${dashboard.totalBeds} total`}
          href="/app/rooms"
          icon={BedDouble}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardSection title="Today’s schedule" href="/app/appointments">
          {todaySchedule.length === 0 ? (
            <EmptyLine>No appointments today.</EmptyLine>
          ) : (
            todaySchedule.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                personLabel={appointment.patientName || "Patient"}
                href="/app/appointments"
              />
            ))
          )}
        </DashboardSection>

        <DashboardSection title="Needs confirmation" href="/app/appointments">
          {pendingList.length === 0 ? (
            <EmptyLine>No pending appointments.</EmptyLine>
          ) : (
            pendingList.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                personLabel={appointment.patientName || "Patient"}
                href="/app/appointments"
              />
            ))
          )}
        </DashboardSection>
      </div>

      <DashboardSection title="Recent reports" href="/app/reports">
        {reports.length === 0 ? (
          <EmptyLine>No reports yet.</EmptyLine>
        ) : (
          reports.map((report) => (
            <ReportRow key={report.id} report={report} showPatient />
          ))
        )}
      </DashboardSection>

      <QuickLinks links={QUICK_LINKS} />
    </div>
  );
}
