import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export const LatestArticlesError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h3 className="text-xl font-semibold">Failed to load articles</h3>
      <p className="text-muted-foreground text-center max-w-md">
        We couldn't fetch the latest articles. Please try again.
      </p>
      <Button onClick={() => refetch()} variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};
