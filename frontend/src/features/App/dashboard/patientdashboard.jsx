import { useEffect, useState } from "react";
import {
  Calendar,
  ClipboardList,
  FileText,
  Pill,
} from "lucide-react";
import DashboardService from "@/services/Dashboard";
import { toast } from "@/components/ui/toast";
import { doctorLabel, getErrorMessage } from "@/shared/utils";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentRow from "./components/AppointmentRow";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSection from "./components/DashboardSection";
import DashboardSkeleton from "./components/DashboardSkeleton";
import EmptyLine from "./components/EmptyLine";
import PrescriptionRow from "./components/PrescriptionRow";
import QuickLinks from "./components/QuickLinks";
import ReportRow from "./components/ReportRow";
import StatCard from "./components/StatCard";

const QUICK_LINKS = [
  { label: "Appointments", href: "/app/appointments", icon: Calendar },
  { label: "Records", href: "/app/records", icon: FileText },
  { label: "Prescriptions", href: "/app/prescriptions", icon: Pill },
  { label: "Reports", href: "/app/reports", icon: ClipboardList },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await DashboardService.GetPatientDashboard();
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
        subtitle="Your care overview could not be loaded."
      />
    );
  }

  const name = user?.email?.split("@")[0] ?? "there";
  const next = dashboard.nextAppointment;
  const prescriptions = dashboard.recentPrescriptions ?? [];
  const reports = dashboard.recentReports ?? [];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Hello, ${name}`}
        subtitle="Your appointments, prescriptions, and reports."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Upcoming appointments"
          value={dashboard.upcomingAppointments}
          href="/app/appointments"
          icon={Calendar}
        />
        <StatCard
          label="Medical records"
          value={dashboard.medicalRecords}
          href="/app/records"
          icon={FileText}
        />
        <StatCard
          label="Prescriptions"
          value={dashboard.prescriptions}
          href="/app/prescriptions"
          icon={Pill}
        />
        <StatCard
          label="Reports"
          value={dashboard.reports}
          href="/app/reports"
          icon={ClipboardList}
        />
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-card to-card ring-primary/15">
        <CardHeader>
          <CardTitle>Next appointment</CardTitle>
        </CardHeader>
        <CardContent>
          {next ? (
            <AppointmentRow
              appointment={next}
              personLabel={doctorLabel(next.doctorName)}
              href="/app/appointments"
            />
          ) : (
            <EmptyLine>No upcoming appointment.</EmptyLine>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardSection title="Recent prescriptions" href="/app/prescriptions">
          {prescriptions.length === 0 ? (
            <EmptyLine>No prescriptions yet.</EmptyLine>
          ) : (
            prescriptions.map((prescription) => (
              <PrescriptionRow key={prescription.id} prescription={prescription} />
            ))
          )}
        </DashboardSection>

        <DashboardSection title="Recent reports" href="/app/reports">
          {reports.length === 0 ? (
            <EmptyLine>No reports yet.</EmptyLine>
          ) : (
            reports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))
          )}
        </DashboardSection>
      </div>

      <QuickLinks links={QUICK_LINKS} />
    </div>
  );
}
