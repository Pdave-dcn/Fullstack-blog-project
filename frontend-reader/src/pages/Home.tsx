import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, TrendingUp, Coffee } from "lucide-react";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Home = () => {
  const {
    data: recentPosts,
    error,
    loading,
  } = useDataFetching<BlogPost[]>("/posts/recent");

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
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
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="animate-pulse"
              variants={itemVariants}
            >
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (error) {
      return (
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
      );
    }

    if (!recentPosts || recentPosts.length === 0) {
      return (
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
      );
    }

    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover="hover"
            className="cursor-pointer"
          >
            <ArticleCard post={post} />
          </motion.div>
        ))}
      </motion.div>
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Welcome to TextNode
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Discover insightful articles, expert opinions, and the latest
              trends in technology, development, and beyond.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/articles">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-blue-700 hover:text-blue-800 transition-all duration-300"
                >
                  Start Reading
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats/Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quality Content
                </h3>
                <p className="text-gray-600">
                  Carefully crafted articles covering the latest in tech,
                  development, and industry insights.
                </p>
              </motion.div>

              <motion.div
                className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Always Fresh
                </h3>
                <p className="text-gray-600">
                  Regular updates with new perspectives on emerging technologies
                  and best practices.
                </p>
              </motion.div>

              <motion.div
                className="p-8 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="w-8 h-8 text-purple-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  For Developers
                </h3>
                <p className="text-gray-600">
                  Written by developers, for developers. Practical insights you
                  can apply immediately.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.3 },
                }}
              >
                <Coffee className="w-10 h-10 text-gray-300" />
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join the Community
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Get the latest articles delivered straight to your inbox. No
                spam, just quality content that helps you stay ahead in your
                development journey.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </motion.div>
              <motion.p
                className="text-sm text-gray-40 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Join 1,000+ developers who read our weekly insights
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex justify-between items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Latest Articles
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Fresh insights and perspectives from the world of development
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/articles`}>
                  <Button
                    variant="outline"
                    className="hidden sm:flex border-gray-200  text-gray-900  hover:bg-gray-100"
                  >
                    View All Articles
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {renderContent()}
            </motion.div>

            <motion.div
              className="text-center mt-12 sm:hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/articles">
                  <Button
                    variant="outline"
                    className="border-gray-200 text-gray-900 hover:bg-gray-100"
                  >
                    View All Articles
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Home;
