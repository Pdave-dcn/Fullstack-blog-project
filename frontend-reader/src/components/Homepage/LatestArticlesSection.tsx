import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { blogPosts } from "@/lib/mock-article-data";
import ArticleCard from "../ArticleCard";

export const LatestArticlesSection = () => {
  const mockRecentArticles = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {HOMEPAGE_DATA.recentArticles.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {HOMEPAGE_DATA.recentArticles.subtitle}
            </p>
          </div>
          <div>
            <Link to="/articles">
              <Button variant="outline" className="hidden sm:flex">
                {HOMEPAGE_DATA.recentArticles.ctaText}
                <div className="ml-2">
                  <ArrowRight size={16} />
                </div>
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockRecentArticles.map((post) => (
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

        <div className="text-center mt-12 sm:hidden">
          <div>
            <Link to="/articles">
              <Button variant="outline">
                {HOMEPAGE_DATA.recentArticles.ctaText}
                <div className="ml-2">
                  <ArrowRight size={16} />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
