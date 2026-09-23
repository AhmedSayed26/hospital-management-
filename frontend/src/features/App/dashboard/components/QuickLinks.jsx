import { Link } from "react-router-dom";

export default function QuickLinks({ links }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Quick access
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <link.icon className="size-4" />
            </span>
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
