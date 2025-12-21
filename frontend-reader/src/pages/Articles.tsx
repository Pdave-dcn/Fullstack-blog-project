import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { articles } from "@/lib/mock-article-data";
import { cn } from "@/lib/utils";
import { layout, spacing, typography } from "@/lib/design-tokens";
import { Ellipse_5 } from "@/components/ui/svgs";
import ArticleCard from "@/components/ArticleCard";

const Articles = () => {
  return (
    <main className="w-full flex flex-col md:gap-18 lg:gap-30">
      {/* Page Header */}
      <section className={cn(layout.headerSection)}>
        <div className={cn(spacing.padding_x, layout.heroSection)}>
          <h1 className={cn(typography.hero.title, "mb-4")}>Articles</h1>
          <p className={cn(typography.hero.subtitle, "lg:w-[70%]")}>
            Explore a complete collection of articles across various topics
          </p>
        </div>
        <div className={`hidden md:flex ${spacing.padding_x}`}>
          <Ellipse_5 />
          <span className="hidden lg:block">
            <Ellipse_5 />
          </span>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className={cn(spacing.padding_x)}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articles.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="cursor-pointer"
              >
                <ArticleCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Articles;
