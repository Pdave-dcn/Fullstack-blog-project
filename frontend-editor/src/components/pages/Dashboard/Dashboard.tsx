import { MessageSquare, FileText, FileCheck, FileX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import StatCard from "./StatCard";
import RecentArticle from "./RecentArticle";

interface Comment {
  id: number;
  content: string;
  articleTitle: string;
  author: {
    name: string;
    username: string;
  };
  createdAt: string;
}

const stats = [
  {
    title: "Articles",
    value: "34",
    icon: <FileText size={20} className="text-blue-600" />,
  },
  {
    title: "Published Articles",
    value: "24",
    icon: <FileCheck size={20} className="text-blue-600" />,
  },
  {
    title: "Draft Articles",
    value: "10",
    icon: <FileX size={20} className="text-blue-600" />,
  },

  {
    title: "Comments",
    value: "189",
    icon: <MessageSquare size={20} className="text-blue-600" />,
  },
];

const recentArticles = [
  {
    title: "How to Build a Better Blog",
    date: "May 12, 2025",
    status: "published" as const,
    views: 432,
  },
  {
    title: "SEO Tips for Content Writers",
    date: "May 10, 2025",
    status: "published" as const,
    views: 289,
  },
  {
    title: "The Future of Content Marketing",
    date: "May 8, 2025",
    status: "draft" as const,
    views: 0,
  },
  {
    title: "Writing Effective Headlines",
    date: "May 5, 2025",
    status: "published" as const,
    views: 567,
  },
];

const recentComments: Comment[] = [
  {
    id: 1,
    content: "This is a great article! Very informative and well written.",
    articleTitle: "How to Build a Better Blog",
    author: {
      name: "John Doe",
      username: "@johndoe",
    },
    createdAt: "2025-05-12T10:00:00",
  },
  {
    id: 2,
    content: "Thanks for sharing these SEO tips. They're really helpful!",
    articleTitle: "SEO Tips for Content Writers",
    author: {
      name: "Jane Smith",
      username: "@janesmith",
    },
    createdAt: "2025-05-10T15:30:00",
  },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
        {stats.map((stat, i) => (
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
              {recentArticles.map((article, i) => (
                <RecentArticle key={i} {...article} />
              ))}
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
              {recentComments.slice(0, 3).map((comment) => (
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
                      {new Date(comment.createdAt).toLocaleDateString()}
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
              ))}
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
