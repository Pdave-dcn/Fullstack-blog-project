import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              className="animate-pulse"
              variants={itemVariants}
            >
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <motion.div
            className="mx-auto max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 text-red-800">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AlertCircle className="h-5 w-5" />
              </motion.div>
              <div>
                <h3 className="font-semibold">Error</h3>
                <p className="text-sm">
                  Failed to load articles. Please try again later.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <motion.div
            className="mx-auto max-w-2xl p-4 bg-blue-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-blue-800">
              <h3 className="font-semibold">No Articles Found</h3>
              <p className="text-sm">Check back later for new content.</p>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <>
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {posts.length} Article{posts.length !== 1 ? "s" : ""} Found
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              className="cursor-pointer"
            >
              <ArticleCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-16">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                All Articles
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Explore a complete collection of articles across various topics
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default Articles;
