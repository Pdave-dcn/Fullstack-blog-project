import { MessageSquare, FileText, FileCheck, FileX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import StatCard from "./StatCard";
import RecentArticle from "./RecentArticle";
import {
  useDashboardStats,
  useRecentArticles,
  useRecentComments,
} from "@/hooks/dashboardHooks";
import { MessageLoading } from "@/components/ui/MessageLoading";
import { handleDate } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { stats, errorStats, loadingStats } = useDashboardStats();
  const { articles, errorArticles, loadingArticles } = useRecentArticles();
  const { comments, errorComments, loadingComments } = useRecentComments();

  const statsCategories = [
    {
      title: "Articles",
      value: `${stats?.totalPosts ?? 0}`,
      icon: <FileText size={20} className="text-blue-600" />,
    },
    {
      title: "Published Articles",
      value: `${stats?.publishedPosts ?? 0}`,
      icon: <FileCheck size={20} className="text-blue-600" />,
    },
    {
      title: "Draft Articles",
      value: `${stats?.draftPosts ?? 0}`,
      icon: <FileX size={20} className="text-blue-600" />,
    },
    {
      title: "Comments",
      value: `${stats?.totalComments ?? 0}`,
      icon: <MessageSquare size={20} className="text-blue-600" />,
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to view the dashboard</p>
      </div>
    );
  }

  if (loadingStats || loadingArticles || loadingComments) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <MessageLoading />
      </div>
    );
  }

  if (errorStats || errorArticles || errorComments) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <p>A network error was encountered</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 w-full">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.username}</h1>

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
              {articles && articles.length > 0 ? (
                articles.map((article, i) => (
                  <RecentArticle key={i} {...article} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent articles
                </p>
              )}
            </div>
            <Button className="w-full mt-4" variant="outline">
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
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.user.username}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {handleDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      On:{" "}
                      <span className="font-medium text-foreground">
                        {comment.post.title}
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
            <Button className="w-full mt-4" variant="outline">
              <Link to="/comments">View All Comments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
