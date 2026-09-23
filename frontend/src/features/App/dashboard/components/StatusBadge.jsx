import { formatLabel } from "@/shared/utils";

const STATUS_CLASS = {
  CONFIRMED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  CANCELED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  COMPLETED: "bg-muted text-muted-foreground",
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
};

function statusLabel(status) {
  const label = formatLabel(status);
  if (!label) return "";
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex h-5 shrink-0 items-center rounded-full px-2 text-xs font-medium ${STATUS_CLASS[status] ?? STATUS_CLASS.PENDING}`}
    >
      {statusLabel(status)}
    </span>
  );
}
