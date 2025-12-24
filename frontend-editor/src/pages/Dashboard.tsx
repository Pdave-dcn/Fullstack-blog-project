import { MessageSquare, Archive, Send, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StatCard from "@/components/Dashboard/StatCard";
import { RecentArticle } from "@/components/Dashboard/RecentArticle";
import { useDashboard } from "@/hooks/useDashboard";
import { handleDate } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { DashboardSkeleton } from "@/components/Dashboard/DashboardSkeleton";
import { DashboardError } from "@/components/Dashboard/DashboardError";

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore();
  const { stats, recentArticles, recentComments, isLoading, isError, refetch } =
    useDashboard();

  const statsCategories = [
    {
      title: "Articles",
      value: `${stats?.totalArticles ?? 0}`,
      icon: <Newspaper size={20} />,
    },
    {
      title: "Published Articles",
      value: `${stats?.publishedArticles ?? 0}`,
      icon: <Send size={20} />,
    },
    {
      title: "Draft Articles",
      value: `${stats?.draftArticles ?? 0}`,
      icon: <Archive size={20} />,
    },
    {
      title: "Comments",
      value: `${stats?.totalComments ?? 0}`,
      icon: <MessageSquare size={20} />,
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert>
          <AlertDescription>
            Please log in to view the dashboard
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) return <DashboardSkeleton />;

  if (isError) return <DashboardError refetch={refetch} />;

  return (
    <div className="container mx-auto px-6 py-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        {statsCategories.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentArticles && recentArticles.length > 0 ? (
                recentArticles.map((article) => (
                  <RecentArticle
                    key={article.id}
                    title={article.title}
                    updatedAt={article.updatedAt}
                    status={article.status}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent articles
                </p>
              )}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link to="/articles">View All Articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments && recentComments.length > 0 ? (
                recentComments.map((comment) => (
                  <div key={comment.id} className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.author.username}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {handleDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      On:{" "}
                      <span className="font-medium text-foreground">
                        {comment.articleTitle}
                      </span>
                    </p>
                    <p className="text-sm">{comment.content}</p>
                    <hr className="my-2" />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent comments
                </p>
              )}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link to="/comments">View All Comments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
