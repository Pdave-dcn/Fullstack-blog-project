import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import LatestArticleCard from "../LatestArticleCard";
import { useLatestArticlesQuery } from "@/queries/article.query";
import { LatestArticlesSkeleton } from "./LatestArticlesSkeleton";
import { LatestArticlesError } from "./LatestArticlesError";

export const LatestArticlesSection = () => {
  const {
    data: articles,
    isLoading,
    isError,
    refetch,
  } = useLatestArticlesQuery();

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

        {/* Loading State */}
        {isLoading && <LatestArticlesSkeleton />}

        {/* Error State */}
        {isError && !isLoading && <LatestArticlesError refetch={refetch} />}

        {/* Success State */}
        {!isLoading && !isError && articles && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <LatestArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && articles && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <p className="text-muted-foreground text-center">
              No articles available at the moment.
            </p>
          </div>
        )}

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
