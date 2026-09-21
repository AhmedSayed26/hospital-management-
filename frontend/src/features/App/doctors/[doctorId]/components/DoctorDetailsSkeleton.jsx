import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
        <div className="space-y-4">
          <Card className="gap-0 py-4">
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
          <Card className="gap-0 py-4">
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
        <Skeleton className="min-h-[280px] rounded-xl" />
      </div>
    </div>
  );
}
