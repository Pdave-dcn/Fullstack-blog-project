import { ABOUTPAGE_DATA } from "@/lib/about-page-data";
import { layout, spacing, typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { Moon_4 } from "../ui/svgs";
import { motion } from "motion/react";
import { fadeUp, slideFade } from "@/lib/animation-variants";

export const AboutPageHeader = () => {
  return (
    <section className={cn(layout.headerSection)}>
      <div className={cn(spacing.padding_x, layout.heroSection, "text-start")}>
        <motion.h1
          className={cn(typography.hero.title, "mb-6")}
          variants={fadeUp}
        >
          {ABOUTPAGE_DATA.header.title}
        </motion.h1>
        <motion.p className={cn(typography.hero.subtitle)} variants={fadeUp}>
          {ABOUTPAGE_DATA.header.subtitle}
        </motion.p>
      </div>
      <motion.div className="hidden md:block" variants={slideFade}>
        <Moon_4 />
      </motion.div>
    </section>
  );
};
