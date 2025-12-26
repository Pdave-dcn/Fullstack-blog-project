import {
  fadeUp,
  staggerContainerFast,
  viewportOptions,
} from "@/lib/animation-variants";
import { motion } from "motion/react";

const socials = [
  {
    label: "Email",
    value: "dprovidence919@gmail.com",
    href: "mailto:dprovidence919@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "/in/davidp919",
    href: "https://www.linkedin.com/in/davidp919/",
  },
  {
    label: "GitHub",
    value: "/pdave-dcn",
    href: "https://github.com/pdave-dcn/",
  },
  {
    label: "Twitter",
    value: "@pdv_stack",
    href: "https://x.com/pdv_stack",
  },
  {
    label: "Threads",
    value: "@pdv_stack",
    href: "https://www.threads.com/@pdv_stack/",
  },
];

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
          className="text-xl mb-8 text-background/80 max-w-2xl mx-auto"
        >
          Have a question, want to share your own experience, or just say hi?
          I'd love to hear from you!
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={`Visit my ${social.label}`}
              className="flex flex-col gap-1 p-4 rounded-lg bg-background/10 hover:bg-background/20 transition-all text-left group border border-transparent hover:border-background/20"
            >
              <span className="text-sm font-medium text-background">
                {social.label}
              </span>
              <span className="text-xs text-background/70 truncate group-hover:text-background/90 transition-colors">
                {social.value}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="text-sm text-background/60 mt-6">
          Don't be shy - I always enjoy connecting with fellow developers and
          curious minds!
        </motion.p>
      </motion.div>
    </section>
  );
};
