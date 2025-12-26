import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import estimateReadTime from "@/utils/estimatedReadTime";
import { formatDate } from "@/utils/formatDate";
import { motion } from "motion/react";
import { fadeUp, blurIn } from "@/lib/animation-variants";
import type { ArticleDetails } from "@/zodSchemas/article.zod";

interface ArticleContentProps {
  article: ArticleDetails;
}

export const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <article>
      <motion.div variants={fadeUp}>
        <Link
          to="/articles"
          className="inline-flex items-center text-primary mb-8"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Articles
        </Link>
      </motion.div>

      <motion.div className="flex items-center gap-4 mb-6" variants={fadeUp}>
        <span className="text-muted-foreground">
          {formatDate(article.createdAt)}
        </span>
        <span className="text-muted-foreground">
          {estimateReadTime(article.content)} min read
        </span>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        variants={fadeUp}
      >
        {article.title}
      </motion.h1>

      <motion.div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
        variants={blurIn}
      />

      <motion.div className="border-t pt-8" variants={fadeUp}>
        <h2 className="text-2xl font-bold mb-6">
          Comments ({article.commentsCount})
        </h2>
      </motion.div>
    </article>
  );
};
