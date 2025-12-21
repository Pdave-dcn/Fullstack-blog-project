import { Skeleton } from "../ui/skeleton";

export const ArticlesSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-64 w-full rounded-lg" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-2 mt-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
    </div>
  </div>
);
