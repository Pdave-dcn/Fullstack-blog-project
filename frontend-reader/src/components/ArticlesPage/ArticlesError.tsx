import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

export const ArticlesError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <AlertCircle className="h-16 w-16 text-destructive" />
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Failed to load articles</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't fetch the articles. Please check your connection and try
          again.
        </p>
      </div>
      <Button onClick={() => refetch()} variant="outline" size="lg">
        <RefreshCw className="mr-2 h-5 w-5" />
        Try Again
      </Button>
    </div>
  );
};
