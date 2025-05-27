import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

const post: BlogPost = {
  id: "4",
  title: "The Art of Clean Code: Writing Maintainable Software",
  excerpt:
    "Discover principles and practices for writing clean, readable, and maintainable code that stands the test of time.",
  content: `
      <h2>What is Clean Code?</h2>
      <p>Clean code is code that is easy to read, understand, and modify. It follows consistent patterns, has clear naming conventions, and is well-organized.</p>
      
      <h2>Naming Conventions</h2>
      <p>Good names are the foundation of clean code. Variables, functions, and classes should have descriptive names that clearly indicate their purpose.</p>
      
      <h2>Function Design</h2>
      <p>Functions should be small, do one thing well, and have descriptive names. They should have minimal parameters and avoid side effects when possible.</p>
      
      <h2>Code Organization</h2>
      <p>Organize code logically with clear separation of concerns. Related functionality should be grouped together, and dependencies should be minimized.</p>
      
      <h2>Documentation and Comments</h2>
      <p>While clean code should be self-documenting, strategic comments can provide valuable context about why certain decisions were made.</p>
    `,
  author: "David Kim",
  publishedAt: "2024-01-08",
  readTime: 7,
  category: "Best Practices",
  tags: [
    "Clean Code",
    "Software Engineering",
    "Best Practices",
    "Maintainability",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
};

const ArticleDetails = () => {
  const isLoading = false;
  const error = false;

  if (isLoading) {
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
              {/* Back Button */}
              <Link
                to="/articles"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Articles
              </Link>

              {/* Article Meta */}
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500">{post.publishedAt}</span>
                <span className="text-gray-500">{post.readTime} min read</span>
              </div>

              {/* Article Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center mb-8 pb-8 border-b">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    By {post.author}
                  </p>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
              </div>

              {/* Article Image */}
              {post.imageUrl && (
                <div className="mb-8">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <CommentSection />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetails;
