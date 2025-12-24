import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export const DashboardError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <Alert variant="destructive" className="max-w-md">
        <AlertDescription className="space-y-4">
          <p>Failed to load dashboard data. Please try again.</p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="w-full"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
