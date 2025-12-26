import {
  fadeUp,
  staggerContainerFast,
  viewportOptions,
} from "@/lib/animation-variants";
import { motion } from "motion/react";

export const ContactSection = () => {
  return (
    <section className="bg-primary text-background py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerContainerFast}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Let's Connect!
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
        >
          Have a question, want to share your own experience, or just say hi?
          I'd love to hear from you!
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://www.threads.com/@pdv_stack"
            className="text-background/75 hover:text-background transition-colors"
            target="_blank"
          >
            🐦 @pdv_stack
          </a>
          <span className="hidden sm:inline text-background">|</span>
          <a
            href="https://www.linkedin.com/in/davidp919"
            className="text-background/75 hover:text-background transition-colors"
            target="_blank"
          >
            💼 LinkedIn
          </a>
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="text-sm text-muted-foreground mt-6"
        >
          Don't be shy - I always enjoy connecting with fellow developers and
          curious minds!
        </motion.p>
      </motion.div>
    </section>
  );
};
