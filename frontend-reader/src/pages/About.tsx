import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  cardVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation-variants";
import { motion } from "motion/react";

const About = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              About TextNode
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              A personal blog project sharing thoughts, insights, and
              discoveries about technology, development, and whatever catches my
              interest.
            </motion.p>
          </motion.div>
        </section>

        {/* About Me Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Hey There! 👋
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Welcome to my little corner of the internet! This blog is
                  where I share my thoughts, experiences, and things I've
                  learned along the way. It's a fun personal project that
                  started as a way to document my journey and maybe help others
                  who are on a similar path.
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-600">
                        Personal Touch
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Every post comes from personal experience, lessons
                        learned, and genuine curiosity about the world.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-600">
                        Learning in Public
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        I believe in learning out loud - sharing both successes
                        and failures to help others avoid the same pitfalls.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="text-center h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-600">Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        While this is a personal project, I love connecting with
                        readers and learning from your experiences too.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                My Story
              </motion.h2>

              <motion.div
                className="prose prose-lg max-w-none text-gray-700"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-xl leading-relaxed mb-6"
                  variants={itemVariants}
                >
                  BlogReader started as a side project in 2025 when I realized I
                  had accumulated a lot of random knowledge and experiences that
                  might be useful to others. As a developer, I'm constantly
                  learning new things, facing challenges, and discovering
                  interesting solutions.
                </motion.p>

                <motion.p
                  className="text-lg leading-relaxed mb-6"
                  variants={itemVariants}
                >
                  Instead of keeping all these insights to myself, I decided to
                  build this platform where I could share them in a structured
                  way. It's also been a great excuse to experiment with new
                  technologies and practice my writing skills - two birds, one
                  stone!
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What I Write About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                What I Write About
              </motion.h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-600">
                        🚀 Development & Tech
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Tutorials, tips, and insights from my coding journey.
                        From React hooks to database design, I share what I've
                        learned building real projects.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-green-600">
                        💡 Problem Solving
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Those "aha!" moments when you figure out a tricky bug or
                        find an elegant solution to a complex problem. I love
                        sharing these breakthroughs.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-purple-600">
                        📚 Learning & Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Reflections on learning new skills, overcoming imposter
                        syndrome, and navigating the ever-changing landscape of
                        technology.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardVariants} whileHover="hover">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-orange-600">
                        🔧 Tools & Workflows
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        Reviews and tutorials on tools, frameworks, and
                        workflows that have made my life easier. If it saves me
                        time, it might save you time too!
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-blue-600 text-white">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's Connect!
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a question, want to share your own experience, or just say
              hi? I'd love to hear from you!
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.a
                href="https://www.threads.com/@pdv_stack"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🐦 @pdv_stack
              </motion.a>
              <span className="hidden sm:inline text-blue-300">|</span>
              <motion.a
                href="https://www.linkedin.com/in/davidp919"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💼 LinkedIn
              </motion.a>
            </motion.div>
            <motion.p
              className="text-sm text-blue-200 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Don't be shy - I always enjoy connecting with fellow developers
              and curious minds!
            </motion.p>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

export default About;
