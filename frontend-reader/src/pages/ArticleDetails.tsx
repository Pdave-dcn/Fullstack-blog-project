import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import estimateReadTime from "@/utils/estimatedReadTime";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { type BlogComment } from "@/types/comment";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: BlogComment[];
  _count: {
    comments: number;
  };
}

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: post,
    error,
    loading,
    refetch,
  } = useDataFetching<BlogPost>(`/posts/${id}`);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Article Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                The article you're looking for doesn't exist or has been
                removed.
              </p>
              <Link to="/articles">
                <Button>
                  <ArrowLeft className="mr-2" size={16} />
                  Back to Articles
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/articles"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Articles
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-500">
                  {formatDate(post.createdAt)}
                </span>
                <span className="text-gray-500">
                  {estimateReadTime(post.content)} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <CommentSection
                comments={post.comments}
                _count={post._count.comments}
                blogPostId={post.id}
                reFetch={refetch}
              />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetails;
