import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export const ArticleEditSkeleton = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Title skeleton */}
        <div>
          <Label>Title</Label>
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Editor skeleton */}
        <div className="flex-1">
          <Label>Content</Label>
          <Skeleton className="h-[500px] w-full mt-2" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex justify-end gap-4 pt-4">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};
