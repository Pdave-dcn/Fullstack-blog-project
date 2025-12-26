import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Moon_4 } from "../ui/svgs";
import { cn } from "@/lib/utils";
import { layout, spacing, typography } from "@/lib/design-tokens";
import { motion } from "motion/react";
import { fadeUp, slideFade } from "@/lib/animation-variants";

export const HeroSection = () => {
  return (
    <section className={cn(layout.headerSection)}>
      <div className={cn(spacing.padding_x, layout.heroSection)}>
        <motion.h1
          className={cn(typography.hero.title, "mb-6")}
          variants={fadeUp}
        >
          {HOMEPAGE_DATA.hero.title}
        </motion.h1>
        <motion.p
          className={cn(typography.hero.subtitle, "mb-8")}
          variants={fadeUp}
        >
          {HOMEPAGE_DATA.hero.subtitle}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/articles">
            <Button size="lg" variant="secondary">
              {HOMEPAGE_DATA.hero.ctaText}
              <div className="ml-2">
                <ArrowRight size={20} />
              </div>
            </Button>
          </Link>
        </motion.div>
      </div>
      <motion.div className="hidden md:block" variants={slideFade}>
        <Moon_4 />
      </motion.div>
    </section>
  );
};
