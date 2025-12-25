import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ArticleReadSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header skeleton */}
      <header className="mb-10 pb-8 border-b">
        <div className="space-y-4">
          {/* Status badge skeleton */}
          <Skeleton className="h-5 w-20" />

          {/* Title skeleton */}
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-1/2" />

          {/* Metadata skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </header>

      {/* Article content skeleton */}
      <Card className="mb-8">
        <CardContent className="space-y-3 pt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="py-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      {/* Comments section skeleton */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-8 rounded-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
};
