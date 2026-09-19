import { useAuth, ROLE_LABELS } from "@/contexts/AuthContext/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PlaceholderPage({ title, description }) {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-medium tracking-tight text-[#24345c]">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {ROLE_LABELS[user?.role]} portal
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section is coming soon. Navigation and role-based access are
            wired up — API integration will be added in the next phase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
