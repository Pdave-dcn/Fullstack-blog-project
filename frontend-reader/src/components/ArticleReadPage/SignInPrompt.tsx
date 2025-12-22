import { MessageSquare, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SignInPromptProps {
  onOpenAuthModal: () => void;
}

export const SignInPrompt = ({ onOpenAuthModal }: SignInPromptProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="text-primary" size={24} />
          <span>Join the Discussion</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 space-y-4">
          <div className="flex justify-center">
            <div className="bg-muted p-4 rounded-full">
              <Lock className="text-muted-foreground" size={28} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Sign in to join the conversation
            </h3>
            <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">
              Create an account or sign in to share your thoughts and engage
              with the community.
            </p>
            <Button onClick={onOpenAuthModal} size="lg">
              Sign In to Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
