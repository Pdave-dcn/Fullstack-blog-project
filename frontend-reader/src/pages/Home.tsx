import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, TrendingUp, Coffee } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/posts/recent`
        );
        const recentPostsResult = await response.json();
        setRecentPosts(recentPostsResult);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to BlogReader
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover insightful articles, expert opinions, and the latest
              trends in technology, development, and beyond.
            </p>
            <Link to="/articles">
              <Button
                size="lg"
                variant="secondary"
                className="text-blue-700 hover:text-blue-800"
              >
                Start Reading
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats/Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quality Content
                </h3>
                <p className="text-gray-600">
                  Carefully crafted articles covering the latest in tech,
                  development, and industry insights.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Always Fresh
                </h3>
                <p className="text-gray-600">
                  Regular updates with new perspectives on emerging technologies
                  and best practices.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  For Developers
                </h3>
                <p className="text-gray-600">
                  Written by developers, for developers. Practical insights you
                  can apply immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join the Community
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get the latest articles delivered straight to your inbox. No
                spam, just quality content that helps you stay ahead in your
                development journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Join 1,000+ developers who read our weekly insights
              </p>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Latest Articles
                </h2>
                <p className="text-xl text-gray-600">
                  Fresh insights and perspectives from the world of development
                </p>
              </div>
              <Link to="/articles">
                <Button variant="outline" className="hidden sm:flex">
                  View All Articles
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts?.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <div className="text-center mt-12 sm:hidden">
              <Link to="/articles">
                <Button variant="outline">
                  View All Articles
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
