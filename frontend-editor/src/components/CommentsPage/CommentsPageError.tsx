import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export const CommentsPageError = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="container mx-auto p-6">
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertDescription className="space-y-4">
          <p>Failed to load comments. Please try again.</p>
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
