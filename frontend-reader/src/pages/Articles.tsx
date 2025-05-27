import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl?: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the future of web development, from AI integration to new JavaScript frameworks.",
    content: `
      <h2>Introduction</h2>
      <p>Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging constantly. As we move through 2024, several key trends are shaping the landscape of how we build and interact with web applications.</p>
      
      <h2>AI Integration in Development</h2>
      <p>Artificial Intelligence is no longer just a buzzword—it's becoming an integral part of the development process. From AI-powered code completion tools like GitHub Copilot to automated testing and deployment pipelines, AI is transforming how developers work.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. This trend is particularly important for applications that require real-time processing and low-latency responses.</p>
      
      <h2>Progressive Web Apps (PWAs) Evolution</h2>
      <p>PWAs continue to bridge the gap between web and native applications, offering offline functionality, push notifications, and app-like experiences directly through web browsers.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning, developers can build better, more efficient, and more user-friendly applications.</p>
    `,
    author: "Sarah Johnson",
    publishedAt: "2024-01-15",
    readTime: 8,
    category: "Technology",
    tags: ["Web Development", "AI", "Trends", "2024"],
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Mastering React Performance Optimization",
    excerpt:
      "Learn advanced techniques to optimize your React applications for better performance and user experience.",
    content: `
      <h2>Why Performance Matters</h2>
      <p>Performance optimization in React applications is crucial for providing a smooth user experience. Slow applications lead to user frustration and can impact business metrics significantly.</p>
      
      <h2>React.memo and Callback Optimization</h2>
      <p>React.memo is a higher-order component that memoizes the result of a component. It only re-renders when its props change, which can significantly improve performance for components that receive the same props frequently.</p>
      
      <h2>Virtual DOM and Reconciliation</h2>
      <p>Understanding how React's virtual DOM works and how the reconciliation process optimizes updates can help you write more efficient components.</p>
      
      <h2>Code Splitting and Lazy Loading</h2>
      <p>Breaking your application into smaller chunks and loading them on demand can dramatically reduce initial load times and improve perceived performance.</p>
      
      <h2>Best Practices</h2>
      <p>Always measure before optimizing, use the React DevTools Profiler, and focus on the most impactful optimizations first.</p>
    `,
    author: "Michael Chen",
    publishedAt: "2024-01-12",
    readTime: 12,
    category: "Development",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Building Accessible Web Applications",
    excerpt:
      "A comprehensive guide to creating web applications that are usable by everyone, including users with disabilities.",
    content: `
      <h2>Understanding Web Accessibility</h2>
      <p>Web accessibility ensures that websites and applications are usable by people with disabilities. This includes users who are blind, deaf, have motor difficulties, or cognitive impairments.</p>
      
      <h2>WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content more accessible. The guidelines are organized around four principles: Perceivable, Operable, Understandable, and Robust.</p>
      
      <h2>Semantic HTML</h2>
      <p>Using semantic HTML elements correctly is the foundation of accessible web development. Screen readers and other assistive technologies rely on proper HTML structure to navigate content.</p>
      
      <h2>ARIA Labels and Roles</h2>
      <p>ARIA (Accessible Rich Internet Applications) attributes provide additional context to assistive technologies when semantic HTML isn't sufficient.</p>
      
      <h2>Testing for Accessibility</h2>
      <p>Regular testing with screen readers, keyboard navigation, and automated accessibility tools helps ensure your applications remain accessible as they evolve.</p>
    `,
    author: "Emily Rodriguez",
    publishedAt: "2024-01-10",
    readTime: 10,
    category: "Accessibility",
    tags: ["Accessibility", "WCAG", "Inclusive Design", "Web Standards"],
    imageUrl:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "The Art of Clean Code: Writing Maintainable Software",
    excerpt:
      "Discover principles and practices for writing clean, readable, and maintainable code that stands the test of time.",
    content: `
      <h2>What is Clean Code?</h2>
      <p>Clean code is code that is easy to read, understand, and modify. It follows consistent patterns, has clear naming conventions, and is well-organized.</p>
      
      <h2>Naming Conventions</h2>
      <p>Good names are the foundation of clean code. Variables, functions, and classes should have descriptive names that clearly indicate their purpose.</p>
      
      <h2>Function Design</h2>
      <p>Functions should be small, do one thing well, and have descriptive names. They should have minimal parameters and avoid side effects when possible.</p>
      
      <h2>Code Organization</h2>
      <p>Organize code logically with clear separation of concerns. Related functionality should be grouped together, and dependencies should be minimized.</p>
      
      <h2>Documentation and Comments</h2>
      <p>While clean code should be self-documenting, strategic comments can provide valuable context about why certain decisions were made.</p>
    `,
    author: "David Kim",
    publishedAt: "2024-01-08",
    readTime: 7,
    category: "Best Practices",
    tags: [
      "Clean Code",
      "Software Engineering",
      "Best Practices",
      "Maintainability",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    title: "CSS Grid vs Flexbox: When to Use Each",
    excerpt:
      "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios.",
    content: `
      <h2>Understanding the Fundamentals</h2>
      <p>Both CSS Grid and Flexbox are powerful layout systems, but they solve different problems. Understanding when to use each can significantly improve your CSS skills.</p>
      
      <h2>Flexbox: One-Dimensional Layouts</h2>
      <p>Flexbox excels at one-dimensional layouts—either rows or columns. It's perfect for navigation bars, card layouts, and centering content.</p>
      
      <h2>CSS Grid: Two-Dimensional Layouts</h2>
      <p>CSS Grid is designed for two-dimensional layouts where you need to control both rows and columns simultaneously. It's ideal for complex page layouts and component grids.</p>
      
      <h2>Combining Both Systems</h2>
      <p>The most powerful approach is often to use both systems together—Grid for the overall page layout and Flexbox for component-level layouts.</p>
      
      <h2>Browser Support and Fallbacks</h2>
      <p>Both technologies have excellent browser support, but understanding progressive enhancement ensures your layouts work everywhere.</p>
    `,
    author: "Lisa Thompson",
    publishedAt: "2024-01-05",
    readTime: 9,
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "Layout", "Web Design"],
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Modern JavaScript: ES6+ Features Every Developer Should Know",
    excerpt:
      "Explore essential ES6+ features that will make your JavaScript more concise, readable, and powerful.",
    content: `
      <h2>Arrow Functions and Scope</h2>
      <p>Arrow functions provide a concise syntax and lexical 'this' binding, making them perfect for callbacks and functional programming patterns.</p>
      
      <h2>Destructuring Assignment</h2>
      <p>Destructuring allows you to extract values from arrays and objects into distinct variables, making your code more readable and reducing boilerplate.</p>
      
      <h2>Template Literals</h2>
      <p>Template literals offer a cleaner way to create strings with embedded expressions and multi-line strings, improving code readability.</p>
      
      <h2>Promises and Async/Await</h2>
      <p>Modern asynchronous JavaScript patterns help you write cleaner, more maintainable code when dealing with API calls and other async operations.</p>
      
      <h2>Modules and Imports</h2>
      <p>ES6 modules provide a standardized way to organize and share code between files, replacing older module systems and improving project structure.</p>
    `,
    author: "Alex Rodriguez",
    publishedAt: "2024-01-12",
    readTime: 8,
    category: "JavaScript",
    tags: [
      "JavaScript",
      "ES6",
      "Modern JavaScript",
      "Programming",
      "Web Development",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
  },
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isLoading = false;

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                All Articles
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our complete collection of articles across various
                topics
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-auto">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all categories
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredPosts.length} Article
                    {filteredPosts.length !== 1 ? "s" : ""} Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
