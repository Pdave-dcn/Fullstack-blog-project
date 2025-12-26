import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ABOUTPAGE_DATA } from "@/lib/about-page-data";
import { motion } from "motion/react";
import {
  fadeUp,
  staggerContainerFast,
  viewportOptions,
} from "@/lib/animation-variants";

export const WhatIWriteAboutSection = () => {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            {ABOUTPAGE_DATA.whatIWriteAbout.heading}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainerFast}
          >
            {ABOUTPAGE_DATA.whatIWriteAbout.topics.map((topic) => (
              <motion.div key={topic.id} variants={fadeUp}>
                <Card className="h-full text-center text-balance lg:text-start">
                  <CardHeader>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg">
                      {topic.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
