import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export const ArticleReadError = ({
  refetch,
  isError,
}: {
  refetch: () => void;
  isError: boolean;
}) => {
  return (
    <main className="flex-1">
      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/articles"
              className="inline-flex items-center text-primary mb-8"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Articles
            </Link>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {isError
                  ? "Failed to load the article. Please try again."
                  : "Article not found."}
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};
