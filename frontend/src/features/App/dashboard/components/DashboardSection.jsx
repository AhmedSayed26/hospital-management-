import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSection({ title, href, children }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/70 pb-(--card-spacing)">
        <CardTitle>{title}</CardTitle>
        <Link
          to={href}
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View all
          <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">{children}</CardContent>
    </Card>
  );
}
