import React from "react";
import {
  BarChart2,
  Eye,
  ThumbsUp,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
          </div>
          <div className="p-2 bg-blue-50 rounded-md">{icon}</div>
        </div>
        <div
          className={`mt-4 text-xs flex items-center ${
            trend === "up"
              ? "text-green-600"
              : trend === "down"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trendValue} from last month
        </div>
      </CardContent>
    </Card>
  );
};

const RecentArticle = ({
  title,
  date,
  status,
  views,
}: {
  title: string;
  date: string;
  status: "published" | "draft";
  views: number;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">Updated on {date}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "published" ? "Published" : "Draft"}
        </span>
        <div className="flex items-center text-sm text-gray-500">
          <Eye size={14} className="mr-1" />
          {views}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: "Total Views",
      value: "24,532",
      icon: <Eye size={20} className="text-blue-600" />,
      trend: "up" as const,
      trendValue: "12%",
    },
    {
      title: "Articles",
      value: "34",
      icon: <FileText size={20} className="text-blue-600" />,
      trend: "up" as const,
      trendValue: "4%",
    },
    {
      title: "Engagement",
      value: "42%",
      icon: <ThumbsUp size={20} className="text-blue-600" />,
      trend: "down" as const,
      trendValue: "5%",
    },
    {
      title: "Comments",
      value: "189",
      icon: <MessageSquare size={20} className="text-blue-600" />,
      trend: "neutral" as const,
      trendValue: "0%",
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
              View All Articles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex justify-center items-center h-64">
              <BarChart2 size={120} className="text-gray-300" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Traffic overview will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

// Add Button component for "View All Articles" button
const Button = ({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium ${
        variant === "default"
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
      } ${className}`}
    >
      {children}
    </button>
  );
};
