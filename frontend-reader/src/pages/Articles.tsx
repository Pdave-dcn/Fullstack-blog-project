import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { useDataFetching } from "@/hooks/use-dataFetching";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  _count: {
    comments: number;
  };
}

const Articles = () => {
  const {
    data: posts,
    error,
    loading,
  } = useDataFetching<BlogPost[]>("/posts/published");

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800">
              <h3 className="font-semibold">Error</h3>
              <p className="text-sm">
                Failed to load articles. Please try again later.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="mx-auto max-w-2xl p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-blue-800">
              <h3 className="font-semibold">No Articles Found</h3>
              <p className="text-sm">Check back later for new content.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {posts.length} Article{posts.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                All Articles
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our complete collection of articles across various
                topics
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
