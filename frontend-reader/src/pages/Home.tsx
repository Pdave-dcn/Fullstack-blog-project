import { HeroSection } from "@/components/Homepage/HeroSection";
import { StatsFeaturesSection } from "@/components/Homepage/StatsFeaturesSection";
import { LatestArticlesSection } from "@/components/Homepage/LatestArticlesSection";
import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animation-variants";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.main
        className="flex-1"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <HeroSection />
        <StatsFeaturesSection />
        <LatestArticlesSection />
      </motion.main>
    </div>
  );
};

export default Home;
