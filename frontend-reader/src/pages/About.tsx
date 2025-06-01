import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About TextNode
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A personal blog project sharing thoughts, insights, and
              discoveries about technology, development, and whatever catches my
              interest.
            </p>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Hey There! 👋
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Welcome to my little corner of the internet! This blog is
                  where I share my thoughts, experiences, and things I've
                  learned along the way. It's a fun personal project that
                  started as a way to document my journey and maybe help others
                  who are on a similar path.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center">
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

                <Card className="text-center">
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

                <Card className="text-center">
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
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                My Story
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-xl leading-relaxed mb-6">
                  BlogReader started as a side project in 2025 when I realized I
                  had accumulated a lot of random knowledge and experiences that
                  might be useful to others. As a developer, I'm constantly
                  learning new things, facing challenges, and discovering
                  interesting solutions.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Instead of keeping all these insights to myself, I decided to
                  build this platform where I could share them in a structured
                  way. It's also been a great excuse to experiment with new
                  technologies and practice my writing skills - two birds, one
                  stone!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I Write About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                What I Write About
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      🚀 Development & Tech
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Tutorials, tips, and insights from my coding journey. From
                      React hooks to database design, I share what I've learned
                      building real projects.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
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

                <Card>
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

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">
                      🔧 Tools & Workflows
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Reviews and tutorials on tools, frameworks, and workflows
                      that have made my life easier. If it saves me time, it
                      might save you time too!
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Connect!
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Have a question, want to share your own experience, or just say
              hi? I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.threads.com/@pdv_stack"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
              >
                🐦 @pdv_stack
              </a>
              <span className="hidden sm:inline text-blue-300">|</span>
              <a
                href="https://www.linkedin.com/in/davidp919"
                className="text-blue-100 hover:text-white transition-colors"
                target="_blank"
              >
                💼 LinkedIn
              </a>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              Don't be shy - I always enjoy connecting with fellow developers
              and curious minds!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
