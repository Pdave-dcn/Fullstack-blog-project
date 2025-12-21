import { AboutMeSection } from "@/components/AboutPage/AboutMeSection";
import { AboutPageHeader } from "@/components/AboutPage/AboutPageHeader";
import { ContactSection } from "@/components/AboutPage/ContactSection";
import { WhatIWriteAboutSection } from "@/components/AboutPage/WhatIWriteAboutSection";
import { motion } from "motion/react";

const About = () => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        {/* Page Header */}
        <div className="mb-20">
          <AboutPageHeader />
        </div>

        <div className="flex flex-col gap-16 md:gap-20 lg:gap-25">
          <AboutMeSection />

          <WhatIWriteAboutSection />

          <ContactSection />
        </div>
      </main>
    </motion.div>
  );
};

export default About;
