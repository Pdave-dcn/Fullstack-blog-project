import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ArticleReadErrorProps {
  refetch: () => void;
}

export const ArticleReadError = ({ refetch }: ArticleReadErrorProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-destructive/50">
        <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="rounded-full bg-destructive/10 p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Failed to Load Article</h2>

          <p className="text-muted-foreground mb-6 max-w-md">
            We encountered an error while loading this article. This could be
            due to a network issue or the article may not exist.
          </p>

          <Button onClick={refetch} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
