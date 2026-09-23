export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/app/dashboard",
    icon: "LayoutDashboard",
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Appointments",
    href: "/app/appointments",
    icon: "Calendar",
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Medical Records",
    href: "/app/records",
    icon: "FileText",
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Prescriptions",
    href: "/app/prescriptions",
    icon: "Pill",
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Patients",
    href: "/app/patients",
    icon: "Users",
    roles: ["ADMIN"],
  },
  {
    title: "Doctors",
    href: "/app/doctors",
    icon: "BriefcaseMedical",
    roles: ["ADMIN"],
  },
  {
    title: "Rooms",
    href: "/app/rooms",
    icon: "BedDouble",
    roles: ["ADMIN"],
  },
  {
    title: "Reports",
    href: "/app/reports",
    icon: "ClipboardList",
    roles: ["USER", "ADMIN"],
  },
];

export function getNavItemsForRole(role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
