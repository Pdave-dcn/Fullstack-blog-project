import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

interface ArticleEditErrorProps {
  onRetry: () => void;
  onBack: () => void;
}

export const ArticleEditError = ({
  onRetry,
  onBack,
}: ArticleEditErrorProps) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <Card className="border-destructive/50 max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="rounded-full bg-destructive/10 p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Failed to Load Article</h2>

          <p className="text-muted-foreground mb-6">
            We couldn't load the article for editing. This could be due to a
            network issue or the article may not exist.
          </p>

          <div className="flex gap-3">
            <Button onClick={onBack} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
            <Button onClick={onRetry} variant="default" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
