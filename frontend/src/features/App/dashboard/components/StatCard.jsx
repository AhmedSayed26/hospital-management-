import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ label, value, hint, href, icon: Icon }) {
  return (
    <Link
      to={href}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="relative h-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/25">
        <span className="absolute inset-x-0 top-0 h-1 bg-primary" />
        <CardContent className="flex items-start justify-between gap-3 pt-1">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-heading mt-1 text-3xl font-medium tracking-tight text-foreground">
              {value ?? "—"}
            </p>
            {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
