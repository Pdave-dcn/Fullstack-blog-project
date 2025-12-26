import { cn } from "@/lib/utils";
import { layout, spacing, typography } from "@/lib/design-tokens";
import { Ellipse_5 } from "@/components/ui/svgs";
import ArticleCard from "@/components/ArticleCard";
import { useArticlesQuery } from "@/queries/article.query";
import { ArticlesSkeleton } from "@/components/ArticlesPage/ArticlesSkeleton";
import { ArticlesError } from "@/components/ArticlesPage/ArticlesError";
import { ArticlesEmpty } from "@/components/ArticlesPage/ArticlesEmpty";
import { motion } from "motion/react";
import {
  fadeUp,
  slideFade,
  staggerContainer,
  staggerContainerFaster,
} from "@/lib/animation-variants";

const Articles = () => {
  const { data: articles, isLoading, isError, refetch } = useArticlesQuery();

  return (
    <main className="w-full flex flex-col md:gap-18 lg:gap-30">
      {/* Page Header */}
      <section className={cn(layout.headerSection)}>
        <motion.div
          className={cn(spacing.padding_x, layout.heroSection)}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={cn(typography.hero.title, "mb-4")}
            variants={fadeUp}
          >
            Articles
          </motion.h1>
          <motion.p
            className={cn(typography.hero.subtitle, "lg:w-[70%]")}
            variants={fadeUp}
          >
            Explore a complete collection of articles across various topics
          </motion.p>
        </motion.div>
        <motion.div
          className={`hidden md:flex ${spacing.padding_x}`}
          variants={slideFade}
          initial="hidden"
          animate="visible"
        >
          <Ellipse_5 />
          <span className="hidden lg:block">
            <Ellipse_5 />
          </span>
        </motion.div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className={cn(spacing.padding_x)}>
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ArticlesSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && <ArticlesError refetch={refetch} />}

          {/* Success State - with articles */}
          {!isLoading && !isError && articles && articles.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
              variants={staggerContainerFaster}
              initial="hidden"
              animate="visible"
            >
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  className="cursor-pointer"
                  variants={fadeUp}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State - no articles */}
          {!isLoading && !isError && articles && articles.length === 0 && (
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <ArticlesEmpty />
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Articles;
