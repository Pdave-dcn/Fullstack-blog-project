import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";

export const ArticlesError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Failed to load articles
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          There was an error loading your articles. Please try again.
        </p>
      </div>
      <Button onClick={() => refetch()} variant="outline" size="sm">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
  );
};
