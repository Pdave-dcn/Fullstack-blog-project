import { HOMEPAGE_DATA } from "@/lib/homepage-data";
import { motion } from "motion/react";
import {
  staggerContainerFast,
  fadeUp,
  viewportOptions,
} from "@/lib/animation-variants";

export const StatsFeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-3 lg:gap-7"
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {HOMEPAGE_DATA.features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={fadeUp}
                className={`px-8 py-6 lg:py-8 rounded-xl border flex flex-col items-center md:items-start gap-15 md:gap-25 lg:gap-30`}
              >
                <div className={`rounded-full`}>
                  <IconComponent />
                </div>
                <div className="flex flex-col text-center md:text-start text-pretty md:text-balance gap-5">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <div className="bg-foreground h-1 w-full" />
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
