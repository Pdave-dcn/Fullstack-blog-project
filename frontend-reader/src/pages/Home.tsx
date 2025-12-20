import { motion } from "motion/react";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { StatsFeaturesSection } from "@/components/Homepage/StatsFeaturesSection";
import { LatestArticlesSection } from "@/components/Homepage/LatestArticlesSection";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-1">
        <HeroSection />

        <StatsFeaturesSection />

        <LatestArticlesSection />
      </main>
    </motion.div>
  );
};

export default Home;
