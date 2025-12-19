import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useDataFetching } from "@/hooks/use-dataFetching";
import { motion } from "motion/react";
import {
  cardVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation-variants";
import { HOMEPAGE_DATA } from "@/lib/homepage-data";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const featureIcons = {
  "quality-content": BookOpen,
  "always-fresh": TrendingUp,
  "for-developers": Users,
};

const Home = () => {
  const {
    data: recentPosts,
    error,
    loading,
  } = useDataFetching<BlogPost[]>("/posts/recent");

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
              <div className="bg-card rounded-lg shadow-md p-6 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="mx-auto max-w-2xl p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 text-destructive">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertCircle className="h-5 w-5" />
            </motion.div>
            <div>
              <h3 className="font-semibold">
                {HOMEPAGE_DATA.errors.fetchError.title}
              </h3>
              <p className="text-sm">
                {HOMEPAGE_DATA.errors.fetchError.message}
              </p>
            </div>
          </div>
        </motion.div>
      );
    }

    if (!recentPosts || recentPosts.length === 0) {
      return (
        <motion.div
          className="mx-auto max-w-2xl p-4 bg-muted border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-muted-foreground">
            <h3 className="font-semibold">
              {HOMEPAGE_DATA.errors.noArticles.title}
            </h3>
            <p className="text-sm">{HOMEPAGE_DATA.errors.noArticles.message}</p>
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
        <section className="bg-primary text-secondary py-20 overflow-hidden">
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
              {HOMEPAGE_DATA.hero.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {HOMEPAGE_DATA.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/articles">
                <Button size="lg" variant="secondary">
                  {HOMEPAGE_DATA.hero.ctaText}
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
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {HOMEPAGE_DATA.features.map((feature) => {
                const Icon =
                  featureIcons[feature.id as keyof typeof featureIcons];
                return (
                  <motion.div
                    key={feature.id}
                    className={`p-8 rounded-xl bg-gradient-to-br ${feature.colorScheme.gradient} border ${feature.colorScheme.border}`}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className={`w-16 h-16 ${feature.colorScheme.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon
                        className={`w-8 h-8 ${feature.colorScheme.iconColor}`}
                      />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-muted/50">
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
                  className="text-3xl md:text-4xl font-bold"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {HOMEPAGE_DATA.recentArticles.title}
                </motion.h2>
                <motion.p
                  className="text-xl text-muted-foreground"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {HOMEPAGE_DATA.recentArticles.subtitle}
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
                <Link to="/articles">
                  <Button variant="outline" className="hidden sm:flex">
                    {HOMEPAGE_DATA.recentArticles.ctaText}
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
                  <Button variant="outline">
                    {HOMEPAGE_DATA.recentArticles.ctaText}
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
    </motion.div>
  );
};

export default Home;
